# Selected Use Cases

Team 6 — Airline CRM — Lab 6

| Use case | Name | Primary actor | Purpose | Reason for selection | Diagram contributor |
|---|---|---|---|---|---|
| UC-01 | Locate Customer | Customer Service Representative | Find customer profiles through manual search or a system-generated reference. | Establishes customer context for other use cases and demonstrates iterative matching and guarded search paths. | Ahmed Sherif (b00098251) |
| UC-04 | View Booking & Travel History | Customer Service Representative | View a selected customer's read-only reservations, flights and cancellations. | Demonstrates retrieval across Customer and Booking objects, with repeated calls for booking details. | Chihab Ben Khadra (b00099008) |
| UC-09 | Adjust Loyalty Points | Customer Service Representative | Adjust a customer's loyalty points for a documented reason, subject to permission and senior review rules. | Demonstrates a state-changing workflow involving validation, authorization, approval and tier recalculation. | Rizwanul Abidin Asim (b00099449) |

IDs are normalized to the UC-XX format used in [Use_Cases.md](../Requirements/Use_Cases.md). These are Lab 6 diagram contributions; the authorship of earlier requirements and class models remains as recorded in those artifacts.

All requested consistency categories were checked. UC-01 and UC-09 have unresolved inconsistencies; UC-04 matches the displayed class operations but needs explicit ordering and scope assumptions. See the review for evidence and corrections. A completed review does not mean that all checks passed.
