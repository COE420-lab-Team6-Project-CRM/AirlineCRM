# Software Process Model — AirlineCRM

## 1. Selected Model

**Incremental model (primary) + Prototyping (secondary, applied to two features only).**

The system is built in five increments, each passing through its own requirements, design,
implementation and testing, and each producing a working release. Prototyping is used inside
the early increments for the two features whose requirements are least clear: the management
dashboard and the marketing/campaign builder.

| # | Increment | Features |
|---|---|---|
| 1 | Core | Customer profiles, user/role management, access control |
| 2 | Service | Booking & travel history, service requests, complaints, notifications |
| 3 | Loyalty | Loyalty points, membership levels, rewards, feedback & satisfaction |
| 4 | B2B | Corporate client accounts, partner/vendor relationship tracking |
| 5 | Insight | Segmentation, marketing communication, reports & dashboards |

## 2. Justification

1. **The system decomposes cleanly.** The ten features in our proposal are functionally
   separable modules over a shared customer/account core, exactly the structure the
   incremental model assumes.
2. **Working software is needed early and repeatedly.** The project is assessed at multiple
   checkpoints, so we need a demonstrable system throughout, not only at the end.
3. **Requirements are stable in structure, unstable in detail.** The scope is fixed by our
   proposal, but feature-level detail (dashboard content, segmentation criteria) will be
   refined as we build. Increments absorb this without disturbing delivered work.
4. **Parallel work suits a three-member team.** Modules can be assigned per member, developed
   on feature branches and integrated, which also makes individual contribution visible in
   the GitHub history.
5. **B2B scope adds real requirement uncertainty.** Corporate accounts and partner tracking
   are less familiar than standard CRM functions, so isolating them in a later increment lets
   us learn from earlier ones first.
6. **Prototyping is targeted, not global.** Only the dashboard and campaign builder are
   prototyped, because we cannot specify those interfaces in advance. Everything else has
   clear enough requirements to build directly.

**Alternatives rejected:** *Waterfall* — needs frozen requirements and defers all testing and
integration to the end. *Spiral* — formal risk cycles and risk expertise are disproportionate
for a semester project. *Unified Process* — architecture-centric and document-heavy; too
complex for a small team. *Scrum* — full ceremony load is too costly; we borrow only a weekly
sync, a shared backlog and a per-increment retrospective as coordination practices.

## 3. Overheads and How We Manage Them

| Overhead | Management strategy |

| **Extensive upfront architecture** — the shared data model must serve all five increments, including B2B accounts added late | Increment 1 is dedicated to the core schema and module boundaries, agreed by all members. Design effort is time-boxed and recorded in one short design note, not a full specification. The schema accommodates both individual and organisational accounts from the start. |
| **Complicated integration** — each increment merges into a growing system and may break earlier features | Feature branches merged into `master` only when the build and tests pass; regression checks on earlier increments re-run before every merge; module interfaces agreed in writing before parallel work begins. |
| **Increased cost/time from dividing the project** — per-increment planning, testing and integration overhead is repeated | Only five increments, so the fixed cost is incurred a limited number of times; one shared test setup and CI configuration reused across all of them. |
| **Prototype effort is discarded** | Prototyping limited to two features; each prototype time-boxed, built with mock data, and capped at two review rounds. |
| **Scope creep from prototype reviews** | Feedback is checked against `Scope.md`. Anything out of scope is logged for a future version, not built. The out-of-scope list is binding. |
| **Poor prototype documentation** | Each review ends with a short written record of what was shown, the feedback, and the decision. Prototype code is not carried into production code. |