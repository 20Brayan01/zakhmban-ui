import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * The release model — Owner Release Model Ruling, 2026-09-20.
 *
 * `release.yml` has two modes, and confusing them is the mistake this guard
 * exists to prevent:
 *
 *   MANUAL, PRE-TAG (`workflow_dispatch`) — the owner supplies a version and
 *   an exact main SHA. Everything is validated first and the tag is created
 *   only afterwards. **This is the mode that prevents a bad release**, and it
 *   can, because no tag exists until the workflow makes one.
 *
 *   AUTOMATIC, POST-TAG (`push.tags`) — the same gates run against a tag
 *   that already exists. **This is verification, never prevention.** On
 *   GitHub the tag exists before the push event is emitted, a failing run
 *   does not remove it, and this mode holds no write permission to try.
 *
 * Which tags reach the second mode is the part that is easy to get wrong,
 * and this guard exists partly because an earlier revision did. `create-tag`
 * pushes with the repository `GITHUB_TOKEN`, and GitHub starts no new
 * workflow run for events created with that token (`workflow_dispatch` and
 * `repository_dispatch` excepted). **An automatically created tag therefore
 * does NOT start a `push.tags` run.** Same-run assurance comes from
 * `verify-created-tag`, which reads the remote ref back inside the dispatch
 * run; `push.tags` is retained for tags pushed by hand or by another
 * credential.
 *
 * That property is GitHub runtime behaviour, not workflow syntax, so no
 * structural assertion can prove it. What is asserted below is everything
 * that surrounds it: the in-run verification job exists and is correct, no
 * second credential was introduced to force a run, and the workflow states
 * the rule in writing so the next reader does not re-derive the mistake.
 *
 * ADR 0001's obligation — prove the extensionless
 * `@zakhmban/ui/tokens/tailwind-preset` subpath against a real Tailwind 4
 * consumer "before release, not assumed" — binds *the commit that implements
 * it*, and the implementing commit discharged it. What the workflow adds is
 * repeatable automated safety: the proof is re-run before every tag, and now
 * genuinely before, not after.
 *
 * The workflow is read with a small indentation parser rather than a
 * substring search, because every question here is structural: which job a
 * step belongs to, what a job's permissions are, what it depends on, and in
 * what order things run. No YAML dependency is added for it — the reviewed
 * devDependency list in `dependencies.test.ts` stays closed, and this file,
 * like every guard here, is self-contained.
 */
const workflowsDir = fileURLToPath(
  new URL("../../.github/workflows", import.meta.url),
);
const release = readFileSync(`${workflowsDir}/release.yml`, "utf8");

/** Text of a block introduced by `key:` at `indent` spaces, its body only. */
function block(source: string, key: string, indent: number): string {
  const lines = source.split("\n");
  const head = `${" ".repeat(indent)}${key}:`;
  const start = lines.findIndex(
    (line) => line === head || line.startsWith(`${head} `),
  );
  if (start === -1) {
    return "";
  }
  const body: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (line.trim() === "") {
      body.push(line);
      continue;
    }
    const depth = line.length - line.trimStart().length;
    if (depth <= indent) {
      break;
    }
    body.push(line);
  }
  return body.join("\n");
}

/** Every job, by name, as its own block of text. */
function jobs(source: string): Record<string, string> {
  const jobsBlock = block(source, "jobs", 0);
  const out: Record<string, string> = {};
  const lines = jobsBlock.split("\n");
  let current: string | null = null;
  for (const line of lines) {
    const head = /^ {2}([a-z][a-z0-9-]*):\s*$/.exec(line);
    if (head !== null) {
      current = head[1] as string;
      out[current] = "";
      continue;
    }
    if (current !== null) {
      out[current] += `${line}\n`;
    }
  }
  return out;
}

type Step = {
  name: string;
  run: string;
  uses: string;
  keys: string[];
  raw: string;
};

/** Ordered steps of one job block, with their scalar keys and run bodies. */
function steps(jobBlock: string): Step[] {
  const lines = block(jobBlock, "steps", 4).split("\n");
  const out: Step[] = [];
  let current: Step | null = null;
  let inRun = false;

  for (const line of lines) {
    const start = /^ {6}- name:\s*(.+)$/.exec(line);
    if (start !== null) {
      current = {
        name: (start[1] as string).trim(),
        run: "",
        uses: "",
        keys: [],
        raw: "",
      };
      out.push(current);
      inRun = false;
      continue;
    }
    if (current === null) {
      continue;
    }
    current.raw += `${line}\n`;
    const key = /^ {8}([a-zA-Z-]+):\s*(.*)$/.exec(line);
    if (key !== null) {
      const name = key[1] as string;
      const value = (key[2] as string).trim();
      current.keys.push(name);
      inRun = name === "run";
      if (name === "run") {
        current.run = value === "|" ? "" : value;
      }
      if (name === "uses") {
        current.uses = value;
      }
      continue;
    }
    if (inRun && /^\s/.test(line)) {
      current.run += `${line.trim()}\n`;
    }
  }
  return out;
}

const triggers = block(release, "on", 0);
const dispatchInputs = block(triggers, "workflow_dispatch", 2);
const job = jobs(release);
const validate = steps(job["validate-candidate"] ?? "");
const tagJob = steps(job["create-tag"] ?? "");
const created = steps(job["verify-created-tag"] ?? "");
const verify = steps(job["verify-tag"] ?? "");

/** The whole file with comment lines stripped — executable content only. */
const executable = release
  .split("\n")
  .filter((line) => !/^\s*#/.test(line))
  .join("\n");

const VALIDATION_COMMANDS = [
  "pnpm install --frozen-lockfile",
  "node scripts/generate-tokens.mjs --check",
  "pnpm format:check",
  "pnpm lint",
  "pnpm typecheck",
  "pnpm test",
  "pnpm build",
  "pnpm verify:dist",
  "pnpm smoke:tailwind",
];

describe("release model — parser sanity", () => {
  it("finds all three jobs and their steps", () => {
    // If this fails the workflow was restructured and every assertion below
    // is inspecting the wrong thing. Fail loudly rather than vacuously pass.
    expect(Object.keys(job).sort()).toEqual([
      "create-tag",
      "validate-candidate",
      "verify-created-tag",
      "verify-tag",
    ]);
    expect(validate.length).toBeGreaterThanOrEqual(10);
    expect(tagJob.length).toBeGreaterThanOrEqual(2);
    expect(created.length).toBeGreaterThanOrEqual(2);
    expect(verify.length).toBeGreaterThanOrEqual(10);
  });
});

describe("release model — triggers and manual inputs", () => {
  it("offers the manual pre-tag mode", () => {
    expect(triggers).toContain("workflow_dispatch:");
  });

  it("keeps the post-tag defence-in-depth trigger", () => {
    expect(block(triggers, "push", 2)).toContain('- "v[0-9]+.[0-9]+.[0-9]+"');
  });

  it("declares exactly the two required inputs, both required strings", () => {
    const inputs = block(dispatchInputs, "inputs", 4);
    const names = [...inputs.matchAll(/^ {6}([a-z_]+):\s*$/gm)].map(
      (match) => match[1],
    );
    expect(names.sort()).toEqual(["commit_sha", "version"]);

    for (const name of names) {
      const input = block(inputs, name as string, 6);
      expect(input, `${name} is not required`).toContain("required: true");
      expect(input, `${name} is not a string`).toContain("type: string");
      expect(input, `${name} has no description`).toContain("description:");
    }
  });

  it("tells the owner the exact input shapes", () => {
    const version = block(block(dispatchInputs, "inputs", 4), "version", 6);
    const sha = block(block(dispatchInputs, "inputs", 4), "commit_sha", 6);
    expect(version).toMatch(/WITHOUT a leading "v"/);
    expect(sha).toMatch(/40-character lowercase/);
  });
});

describe("release model — pre-tag validation", () => {
  const script = validate.map((step) => step.run).join("\n");

  it("runs only for a manual dispatch", () => {
    expect(job["validate-candidate"]).toContain(
      "if: github.event_name == 'workflow_dispatch'",
    );
  });

  it("rejects a version that is not strict MAJOR.MINOR.PATCH", () => {
    expect(script).toContain(
      "^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)$",
    );
  });

  it("rejects a leading v explicitly", () => {
    expect(script).toContain('"${VERSION#v}" != "$VERSION"');
  });

  it("requires a 40-character lowercase SHA", () => {
    expect(script).toContain("^[0-9a-f]{40}$");
  });

  it("requires the commit to exist and to be main's tip", () => {
    expect(script).toContain('git cat-file -e "${COMMIT_SHA}^{commit}"');
    expect(script).toContain("refs/remotes/origin/main");
    expect(script).toContain('"$COMMIT_SHA" != "$main_tip"');
  });

  it("requires package.json to already carry the requested version", () => {
    expect(script).toContain('"$manifest_version" != "$VERSION"');
    expect(script).toMatch(/version-bump pull request/i);
  });

  it("requires the package to still be private", () => {
    expect(script).toContain('"$manifest_private" != "true"');
  });

  it("requires the target tag to be absent, remotely and locally", () => {
    expect(script).toContain('git ls-remote --tags origin "refs/tags/${tag}"');
    expect(script).toContain('git rev-parse -q --verify "refs/tags/${tag}"');
  });

  it("checks out the exact validated commit before testing it", () => {
    expect(script).toContain('git checkout --detach "$COMMIT_SHA"');
  });

  it("binds its shell variables to the owner's inputs, nothing else", () => {
    // Without this the script could be fed `github.ref` or a default and
    // still look correct: every check below it would pass against the wrong
    // commit.
    const inputsStep = validate.find((step) => step.raw.includes("id: inputs"));
    expect(inputsStep, "the validation step is gone").toBeDefined();
    const env = block(inputsStep?.raw ?? "", "env", 8);
    expect(env).toContain("VERSION: ${{ inputs.version }}");
    expect(env).toContain("COMMIT_SHA: ${{ inputs.commit_sha }}");

    const checkout = validate.find((step) =>
      step.run.includes("git checkout --detach"),
    );
    expect(block(checkout?.raw ?? "", "env", 8)).toContain(
      "COMMIT_SHA: ${{ steps.inputs.outputs.commit_sha }}",
    );
  });

  it("runs the complete approved validation suite", () => {
    const commands = validate.map((step) => step.run.trim());
    for (const command of VALIDATION_COMMANDS) {
      expect(
        commands.includes(command),
        `validate-candidate does not run \`${command}\``,
      ).toBe(true);
    }
  });

  it("ends with the Tailwind consumer smoke test", () => {
    // It packs the tree, so build and dist verification must precede it, and
    // nothing may run after it inside the gate.
    const index = (command: string) =>
      validate.findIndex((step) => step.run.trim() === command);
    expect(index("pnpm smoke:tailwind")).toBeGreaterThan(index("pnpm build"));
    expect(index("pnpm smoke:tailwind")).toBeGreaterThan(
      index("pnpm verify:dist"),
    );
    expect(validate[validate.length - 1]?.run.trim()).toBe(
      "pnpm smoke:tailwind",
    );
  });

  it("cannot write anything", () => {
    expect(block(job["validate-candidate"] ?? "", "permissions", 4)).toContain(
      "contents: read",
    );
    expect(job["validate-candidate"]).not.toContain("contents: write");
  });
});

describe("release model — automated tag creation", () => {
  const script = tagJob.map((step) => step.run).join("\n");

  it("runs only for a manual dispatch", () => {
    expect(job["create-tag"]).toContain(
      "if: github.event_name == 'workflow_dispatch'",
    );
  });

  it("cannot run unless the whole validation job succeeded", () => {
    // `needs` is the gate: GitHub skips a needing job when its dependency
    // fails, and validate-candidate has no step-level escape that could let
    // a failure through.
    expect(job["create-tag"]).toContain("needs: validate-candidate");
    for (const step of validate) {
      expect(step.keys, `${step.name} is conditional`).not.toContain("if");
    }
  });

  it("consumes the validated values, not the raw inputs", () => {
    const writeStep = tagJob.find((step) => step.run.includes("git tag -a"));
    const env = block(writeStep?.raw ?? "", "env", 8);
    expect(env).toContain(
      "VERSION: ${{ needs.validate-candidate.outputs.version }}",
    );
    expect(env).toContain(
      "COMMIT_SHA: ${{ needs.validate-candidate.outputs.commit_sha }}",
    );
    expect(env).toContain("TAG: ${{ needs.validate-candidate.outputs.tag }}");
    expect(env).not.toContain("inputs.");

    // The checkout targets the validated SHA too, not a branch.
    expect(job["create-tag"]).toContain(
      "ref: ${{ needs.validate-candidate.outputs.commit_sha }}",
    );
  });

  it("re-verifies everything immediately before writing", () => {
    expect(script).toContain('"$(git rev-parse HEAD)" != "$COMMIT_SHA"');
    expect(script).toContain('git cat-file -e "${COMMIT_SHA}^{commit}"');
    expect(script).toContain('"$TAG" != "v${VERSION}"');
    expect(script).toContain('"$manifest_version" != "$VERSION"');
  });

  it("re-checks remote tag absence as the mandatory race safeguard", () => {
    expect(script).toContain('git ls-remote --tags origin "refs/tags/${TAG}"');
    expect(script).toMatch(/won the race/);
  });

  it("creates an annotated tag on the validated commit", () => {
    expect(script).toContain('git tag -a "$TAG" "$COMMIT_SHA"');
    // A lightweight tag carries no tagger, date or message.
    expect(script).not.toMatch(/git tag\s+"\$TAG"/);
  });

  it("pushes exactly one tag ref, and no branch", () => {
    const pushes = [...script.matchAll(/^git push .*$/gm)].map((m) => m[0]);
    expect(pushes).toEqual([
      'git push origin "refs/tags/${TAG}:refs/tags/${TAG}"',
    ]);
    // No forced push. `git fetch --tags --force` above is a different thing
    // and is legitimate: it refreshes tag refs, it does not write remotely.
    for (const push of pushes) {
      expect(push, "a push is forced").not.toMatch(/--force|\s\+refs/);
      expect(push, "a branch is pushed").not.toMatch(/HEAD|main/);
    }
  });

  it("uses the automation identity, never a personal one", () => {
    expect(script).toContain('git config user.name "github-actions[bot]"');
    expect(script).toContain(
      "41898282+github-actions[bot]@users.noreply.github.com",
    );
  });

  it("holds the only write permission in the workflow", () => {
    expect(block(job["create-tag"] ?? "", "permissions", 4)).toContain(
      "contents: write",
    );
    for (const other of ["validate-candidate", "verify-tag"]) {
      expect(job[other], `${other} must stay read-only`).not.toContain(
        "contents: write",
      );
    }
    // Workflow-level default stays read-only, so nothing inherits write.
    expect(block(release, "permissions", 0).trim()).toBe("contents: read");
    for (const scope of [
      "pull-requests: write",
      "issues: write",
      "actions: write",
      "packages: write",
      "administration: write",
      "id-token: write",
    ]) {
      expect(executable, `${scope} must not be granted`).not.toContain(scope);
    }
  });
});

describe("release model — post-tag verification", () => {
  it("runs only for a tag push and stays read-only", () => {
    expect(job["verify-tag"]).toContain("if: github.event_name == 'push'");
    expect(block(job["verify-tag"] ?? "", "permissions", 4)).toContain(
      "contents: read",
    );
  });

  it("checks tag ancestry and manifest agreement, then revalidates", () => {
    const script = verify.map((step) => step.run).join("\n");
    expect(script).toContain("merge-base --is-ancestor");
    expect(script).toContain('"$GITHUB_REF_NAME" != "$expected_tag"');

    const commands = verify.map((step) => step.run.trim());
    for (const command of VALIDATION_COMMANDS) {
      expect(
        commands.includes(command),
        `verify-tag does not run \`${command}\``,
      ).toBe(true);
    }
  });

  it("is described as verification, never as prevention", () => {
    // The wording is part of the contract: the earlier record claimed this
    // mode prevented a bad tag, which is false and is why the owner ruling
    // exists. Keep the correction visible in the file itself.
    expect(release).toMatch(/post-tag/i);
    expect(release).toMatch(/It reports; it\s*#?\s*does not protect\./);
    expect(release).not.toMatch(/tag-triggered[^.]*prevents/i);
  });

  it("never writes a tag", () => {
    const script = verify.map((step) => step.run).join("\n");
    expect(script).not.toContain("git tag");
    expect(script).not.toContain("git push");
  });
});

describe("release model — same-run verification of the created tag", () => {
  const script = created.map((step) => step.run).join("\n");

  it("exists, and runs only after a successful tag creation", () => {
    expect(job["verify-created-tag"], "the job is missing").toBeDefined();
    const needs = /needs: \[([^\]]+)\]/.exec(job["verify-created-tag"] ?? "");
    expect(needs, "verify-created-tag declares no needs").not.toBeNull();
    expect(
      (needs?.[1] ?? "")
        .split(",")
        .map((n) => n.trim())
        .sort(),
    ).toEqual(["create-tag", "validate-candidate"]);
  });

  it("runs only for a manual dispatch", () => {
    expect(job["verify-created-tag"]).toContain(
      "if: github.event_name == 'workflow_dispatch'",
    );
  });

  it("is read-only", () => {
    expect(block(job["verify-created-tag"] ?? "", "permissions", 4)).toContain(
      "contents: read",
    );
    expect(job["verify-created-tag"]).not.toContain("contents: write");
  });

  it("carries no continue-on-error and no conditional step", () => {
    expect(job["verify-created-tag"]).not.toContain("continue-on-error");
    for (const step of created) {
      expect(step.keys, `${step.name} is conditional`).not.toContain("if");
    }
  });

  it("uses the validated outputs, not a fresh reading", () => {
    const check = created.find((step) => step.run.includes("git ls-remote"));
    const env = block(check?.raw ?? "", "env", 8);
    expect(env).toContain(
      "COMMIT_SHA: ${{ needs.validate-candidate.outputs.commit_sha }}",
    );
    expect(env).toContain("TAG: ${{ needs.validate-candidate.outputs.tag }}");
    expect(env).toContain(
      "VERSION: ${{ needs.validate-candidate.outputs.version }}",
    );
    expect(env).not.toContain("inputs.");
  });

  it("proves the remote tag exists, is annotated and matches the SHA", () => {
    expect(script).toContain('git ls-remote --tags origin "refs/tags/${TAG}"');
    expect(script).toContain('git cat-file -t "refs/tags/${TAG}"');
    expect(script).toContain('"$object_type" != "tag"');
    expect(script).toContain('git rev-parse "refs/tags/${TAG}^{commit}"');
    expect(script).toContain('"$tagged_commit" != "$COMMIT_SHA"');
  });

  it("does not re-run the validation suite", () => {
    // That SHA was fully validated before the tag existed. Re-running proves
    // nothing new; the unproven thing was the remote ref.
    for (const command of VALIDATION_COMMANDS) {
      expect(
        script.includes(command),
        `verify-created-tag re-runs \`${command}\``,
      ).toBe(false);
    }
  });

  it("creates, moves and deletes no tag", () => {
    expect(script).not.toMatch(/git tag\s+-[adf]/);
    expect(script).not.toContain("git push");
    expect(script).not.toContain("--force");
  });
});

describe("release model — global safety properties", () => {
  it("serialises manual releases without cancelling a tag write", () => {
    const concurrency = block(release, "concurrency", 0);
    expect(concurrency).toContain("group:");
    expect(concurrency).toContain("cancel-in-progress: false");
  });

  it("marks no step continue-on-error anywhere", () => {
    for (const [name, body] of Object.entries(job)) {
      expect(body, `${name} uses continue-on-error`).not.toContain(
        "continue-on-error",
      );
    }
  });

  it("uses no step-level conditional bypass", () => {
    for (const [name, list] of Object.entries({
      "validate-candidate": validate,
      "create-tag": tagJob,
      "verify-tag": verify,
    })) {
      for (const step of list) {
        expect(
          step.keys,
          `${name} / ${step.name} is conditional`,
        ).not.toContain("if");
      }
    }
  });

  it("interpolates no workflow context into any shell body", () => {
    // Every value a script reads arrives through a validated environment
    // variable, so a version string or tag name can never become a command.
    for (const list of [validate, tagJob, verify]) {
      for (const step of list) {
        expect(
          step.run.includes("${{"),
          `${step.name} interpolates a context value into its script`,
        ).toBe(false);
      }
    }
  });

  it("pins every third-party action by commit SHA", () => {
    const uses = [...release.matchAll(/uses: (\S+)/g)].map(
      (m) => m[1] as string,
    );
    expect(uses.length).toBeGreaterThan(0);
    for (const action of uses) {
      expect(action, `${action} is not SHA-pinned`).toMatch(/@[0-9a-f]{40}$/);
    }
  });

  it("never mutates package.json or the version", () => {
    expect(executable).not.toMatch(/npm version|pnpm version|yarn version/);
    expect(executable).not.toMatch(/>\s*package\.json/);
    expect(executable).not.toMatch(/npm pkg set/);
  });

  it("creates no GitHub Release and publishes no package, in any workflow", () => {
    // Frozen §2.2: the tag IS the release. A publish step would be a release
    // architecture this repository has not decided, and needs an ADR.
    const forbidden = [
      "gh release",
      "actions/create-release",
      "softprops/action-gh-release",
      "npm publish",
      "pnpm publish",
      "yarn publish",
      "actions/upload-artifact",
    ];
    for (const file of readdirSync(workflowsDir)) {
      const source = readFileSync(`${workflowsDir}/${file}`, "utf8")
        .split("\n")
        .filter((line) => !/^\s*#/.test(line))
        .join("\n");
      for (const command of forbidden) {
        expect(
          source.includes(command),
          `${file} contains "${command}" — adding a publish step needs an ADR`,
        ).toBe(false);
      }
    }
  });

  it("introduces no second credential", () => {
    // The whole point of the correction is that no PAT, GitHub App or deploy
    // key was added to force a second workflow run. A credential is a
    // long-lived privilege; a documentation fix is not.
    for (const file of readdirSync(workflowsDir)) {
      const source = readFileSync(`${workflowsDir}/${file}`, "utf8")
        .split("\n")
        .filter((line) => !/^\s*#/.test(line))
        .join("\n");
      for (const marker of [
        "secrets.",
        "persist-credentials",
        "ssh-key",
        "deploy-key",
        "app-id",
        "private-key",
        "PERSONAL_ACCESS_TOKEN",
        "actions/create-github-app-token",
      ]) {
        expect(
          source.includes(marker),
          `${file} references "${marker}" — no second credential may be introduced`,
        ).toBe(false);
      }
      // `token:` on a checkout would swap the credential silently.
      expect(source).not.toMatch(/^\s+token:/m);
    }
  });

  it("documents the GITHUB_TOKEN no-recursion rule in the workflow", () => {
    // The property cannot be asserted structurally, so the guard asserts the
    // explanation is present and that nothing claims the opposite.
    expect(release).toContain("GITHUB_TOKEN");
    expect(release).toMatch(/does NOT start a push\.tags run/);
    // The two exceptions are named; the comment wraps between them, so the
    // assertion is on their presence beside the rule, not on one line.
    expect(release).toContain("repository_dispatch");
    expect(release).toMatch(/excepted/);
    expect(release).not.toMatch(/tag[^.]*just pushed/i);
    expect(release).not.toMatch(/triggers the post-tag/i);
  });

  it("keeps push.tags available for manually or externally pushed tags", () => {
    expect(block(triggers, "push", 2)).toContain('- "v[0-9]+.[0-9]+.[0-9]+"');
    expect(release).toMatch(/pushed by a human|by hand|externally/i);
  });

  it("names real package scripts, so no gate can be a typo", () => {
    const manifest: Record<string, unknown> = JSON.parse(
      readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
    ) as Record<string, unknown>;
    const scripts = manifest["scripts"] as Record<string, string>;
    for (const command of VALIDATION_COMMANDS) {
      if (!command.startsWith("pnpm ")) {
        continue;
      }
      const name = command.slice("pnpm ".length);
      if (name.startsWith("install")) {
        continue;
      }
      expect(
        scripts[name],
        `package.json has no "${name}" script`,
      ).toBeDefined();
    }
  });
});
