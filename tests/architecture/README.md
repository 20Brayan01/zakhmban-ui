# Architecture tests

These protect the package's shape, not its features. Every assertion here
traces to a rule in one of the canonical sources listed below, and the failure
message names its source so a future contributor can argue with the rule rather
than guess at the test.

**A guard may cite:**

- the canonical document registry,
  `docs/architecture/canonical-document-registry.md`;
- Frozen Technical Architecture v1.1 §2 / §2.1 / §2.2;
- the workspace `project-context/` package, where a rule is product truth;
- UI System Specification v0.2,
  `docs/architecture/zakhmban-ui-system-spec.md`;
- an **approved owner ruling**;
- an **accepted ADR** — `root-export.test.ts`, for instance, traces to
  ADR 0002;
- an **individually approved** entry in
  `docs/architecture/token-table-ratification.md`.

**A guard may not** be based on a reference kit, on legacy or consumer code, or
on an entry that is open, deferred or proposed. Those are evidence, and
evidence is not a rule. Where the registry records that a source has been
superseded in part, cite the superseding source, not the superseded text.

Each file is **deliberately self-contained** — no shared helper module. A guard
that depends on shared code can be defeated by editing the shared code, which
is the one edit a guard must not be vulnerable to. The small duplication is the
price of that property.
