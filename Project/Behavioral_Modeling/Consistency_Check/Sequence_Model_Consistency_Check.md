# Sequence Model Consistency Check

Review date: 2 November 2026. Airline CRM, Team 6, Lab 6.

## Result

**UC-01, UC-04 and UC-09 pass the static consistency checks for the modeled interactions and their explicit contracts.** The previously reported receiver, operation, authorization, approval, lifecycle and scope mismatches have been resolved in the three editable diagrams. The supporting contracts state the required behavior of ordering, import-error handling, denied-action logging and atomic rollback; they do not constitute implementation or performance test results.

The review checked the revised XML, message endpoints, class-operation mappings, branch conditions, object lifetimes and rendered screenshots. The Word report now contains the corresponding corrected screenshots and a matching review summary.

## Reviewed artifacts

- [UC-01 Locate Customer](../Sequence_Diagrams/UC1Update.drawio) and [verified screenshot](../Sequence_Diagrams/Screenshots/UC1.png).
- [UC-04 View Booking and Travel History](../Sequence_Diagrams/UC4Update.drawio) and [verified screenshot](../Sequence_Diagrams/Screenshots/UC4.png).
- [UC-09 Adjust Loyalty Points](../Sequence_Diagrams/UC9%20Sequence%20Diagram%20-%20Rizwanul.drawio) and [verified screenshot](../Sequence_Diagrams/Screenshots/UC9.png).
- [Approved use cases](../../Requirements/Use_Cases.md), [functional requirements](../../Requirements/Functional_Requirements.md), [non-functional requirements](../../Requirements/Non_Functional_Requirements.md) and [scenarios](../../Requirements/Scenarios.md).
- [Lab 5 class diagram](../../Object_Modeling/Class_Diagram/Lab5Combined.drawio) and [class inventory](../../Object_Modeling/Class_Inventory.md).

The supplied update filenames originally contained each other's use case: UC1Update contained travel history and UC4Update contained customer search. Their contents were placed in the matching files. The original diagrams' shapes, monochrome styling, dashed returns, activation bars and editable draw.io format were retained. Screenshots use the same dark presentation as the supplied report.

## Checklist after correction

| Lab 6 check | UC-01 | UC-04 | UC-09 |
|---|---|---|---|
| Represents an approved use case | Pass: UC-01 | Pass: UC-04 | Pass: UC-09 |
| Supports the use case goal | Pass: finds matching customers | Pass: retrieves read-only history | Pass: applies a documented, permitted adjustment |
| Reflects description and flow | Pass: manual and link-directed alternatives | Pass: selected customer and newest-first history | Pass: validation, permission and threshold-based review |
| Avoids unsupported functionality | Pass: no navigation-triggered delivery-status update | Pass: no booking mutation | Pass: unsupported summary call and tier notification removed |
| Objects correspond to classes | Pass: Customer, Booking | Pass: Customer, Booking | Pass: LoyaltyAccount, PointAdjustment, StaffAccount; CSR and senior reviewer are actors |
| Calls match receiving class operations | Pass | Pass | Pass; creation is an explicit initialization contract |
| Messages connect plausible participants | Pass: both searches target Customer | Pass: Customer queries Booking | Pass: adjustment checks CSR permission; senior actor reviews adjustment |
| Required operations exist or model is reconciled | Pass: no new class operations | Pass: contracts use existing operations | Pass: no new class operations; unsupported call removed |
| Reflects the proposed system | Pass: FR-02 and authenticated access | Pass: FR-03 and NFR-03 contracts | Pass: FR-09, NFR-07, NFR-09 and denied-action logging contract |
| Actor matches the use case | Pass: CSR | Pass: CSR | Pass: CSR with a supporting senior reviewer |
| Message order is logical | Pass: request, matching, result | Pass: retrieval, getter calls, result | Pass: creation before use; checks before mutation |
| Understandable and internally consistent | Pass: alternative paths and return contract stated | Pass: consistent instance notation and error contract | Pass: explicit guards, reviewer identity, lifecycle and transaction outcomes |

## Resolved findings

### UC-01 Locate Customer

- **Wrong receiver resolved:** the lifeline receiving `search` and executing `matches` is now `:Customer`.
- **Notification context resolved:** a precondition states that the notification link supplies `customerId`; that search goes directly from the CSR to Customer. The redundant Notification lane and the unsupported `updateStatus` call were removed.
- **Search scope clarified:** the diagram lists all five FR-02 identifiers and returns all matches, including an empty list. Authentication is a precondition; manual and notification-directed searches are alternatives.
- **Connector correction:** the booking-reference return now originates at the Booking activation rather than a detached label. Both search returns and direct calls have explicit endpoints.

### UC-04 View Booking and Travel History

- **Instance notation resolved:** the participant is `:Booking`.
- **Ordering resolved:** the return explicitly states travel-date descending order and read-only access.
- **Context resolved:** the preconditions state authenticated CSR, completed UC-01 and selected customer. The source is already-imported reservation data, so import is not incorrectly repeated on every view.
- **Import exception documented:** the retrieval contract excludes only invalid/partially imported records, preserves valid history and shows a data-quality notice. It also states the empty-history outcome.

### UC-09 Adjust Loyalty Points

- **Missing operation resolved without editing Lab 5:** removed `PointAdjustment.getSummary()` and its summary return. `LoyaltyAccount.getAdjustments()` directly returns the existing records as `List<PointAdjustment>`; angle brackets are escaped for correct HTML rendering.
- **Object lifecycle resolved:** the new `adj:PointAdjustment` begins at its create message and is no longer used for historical records before creation. The initialization contract names points, reason code and note. No constructor is falsely claimed to be a listed Lab 5 operation.
- **Validation resolved:** `valid := validate()` supplies the input-validity condition. Missing reason code or note leads to a refused result and stops the workflow.
- **Permission gating resolved:** `csrAccount:StaffAccount` represents the requester. A denied `authorize("ADJUST_POINTS")` result stops the workflow, and `canApply` requires permission. A contract specifies immutable denied-attempt AuditLogEntry records linked to the CSR and retained for at least 12 months.
- **Senior review resolved:** a Senior Staff Member actor supplies `seniorAccount` to the existing `approve`/`reject` operations. Acceptance and rejection are alternative guarded branches. The approval result is explicit and starts false; pending, rejected or unsuccessful approval leaves the balance unchanged.
- **At-or-below-threshold path resolved:** `needsSenior = (points > 3000)`. The application guard is `valid AND permitted AND (NOT needsSenior OR seniorApproved)`, so a valid, permitted 2,000-point adjustment can proceed without senior approval, while a 3,001-point adjustment cannot.
- **Unsupported notification behavior removed:** the tier-change Notification participant, creation and unconditional `SENT` update were removed from this use case. Notification lifetime and delivery claims therefore no longer conflict with the modeled flow.
- **Customer context resolved:** UC-01 completion and ownership of the LoyaltyAccount by the selected customer are preconditions.
- **Transaction behavior specified:** applying the adjustment and recalculating the tier commit atomically. Failure/interruption rolls back the complete balance, tier and adjustment change and returns false. Successful commit returns true.
- **Iteration retained:** the create message uses iterative notation; the note states that the guarded workflow repeats for each separately submitted adjustment with a fresh object.

## Operation mapping

| Diagram | Receiver | Calls checked against Lab 5 |
|---|---|---|
| UC-01 | Customer | search(String), matches(String) |
| UC-01 | Booking | getBookingReference() |
| UC-04 | Customer | getTravelHistory() |
| UC-04 | Booking | getBookingReference(), getRoute(), getTravelDate(), getStatus() |
| UC-09 | LoyaltyAccount | getBalance(), getAdjustments(Date, Date), applyAdjustment(PointAdjustment), protected self-call recalculateTier() |
| UC-09 | PointAdjustment | validate(), requiresSeniorApproval(), approve(StaffAccount), reject(StaffAccount, String) |
| UC-09 | StaffAccount | authorize(String) |

### Guard evaluation

The complete Boolean truth table for `canApply` was checked. Representative outcomes are below. These are static guard checks, not running application tests.

| Input valid | Permitted | Points | Senior approved | May apply |
|---|---|---:|---|---|
| No | Yes | 2,000 | No | No |
| Yes | No | 2,000 | No | No |
| Yes | Yes | 2,000 | No | Yes |
| Yes | Yes | 3,000 | No | Yes |
| Yes | Yes | 3,001 | No | No |
| Yes | Yes | 3,001 | Yes | Yes |
| Yes | No | 3,001 | Yes | No |

## Verification and boundaries

All three draw.io files parse successfully with unique cell IDs and valid parent/source/target references. Call names were compared with the receiving classes' operations. The diagrams were rendered using the diagrams.net viewer and their screenshots inspected for clipping, readable labels and correct arrows.

No changes to Lab 3 requirements or the Lab 5 class model were needed. NFR timing, screen-count usability, encryption, audit retention and transaction durability still require implementation verification. The diagrams state the relevant model contracts; this review does not certify deployed behavior. UC-09 models the general adjustment use case, not every detail of the feedback-linked S-03 scenario.

GAI statement: OpenAI Codex assisted with correcting the sequence diagrams, rendering and inspecting screenshots, checking class/requirement consistency, and updating this review and the Word report.
