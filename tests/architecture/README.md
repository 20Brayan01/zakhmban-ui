# Architecture tests

These protect the package's shape, not its features. Every assertion here
traces to a rule in Frozen Technical Architecture v1.1 §2 / §2.1 / §2.2 or in
`docs/architecture/zakhmban-ui-system-spec.md`, and the failure message names
its source so a future contributor can argue with the rule rather than guess at
the test.

Each file is **deliberately self-contained** — no shared helper module. A guard
that depends on shared code can be defeated by editing the shared code, which
is the one edit a guard must not be vulnerable to. The small duplication is the
price of that property.
