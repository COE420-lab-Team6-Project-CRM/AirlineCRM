# Class Inventory

The integrated AirlineCRM model contains 19 unique classes. 

| Class ID | Class Name | Purpose/Responsibility | Related Use Case(s) | Contributor |
|---|---|---|---|---|
| C01 | Customer | Stores a customer's profile and contact details, central entity linking bookings and service requests, supports search by name, ID, email, phone or booking ref. | UC-01, UC-02, UC-03, UC-16 | Ahmed Sherif |
| C02 | Booking | Read-only reservation/flight record (reference, route, dates, status) for travel history and booking-ref search. | UC-01, UC-03, UC-04, UC-05 | Ahmed Sherif |
| C03 | ReservationImportRecord | One row of simulated imported reservation data, matches the customer and creates/updates the Booking. | UC-04 | Ahmed Sherif |
| C04 | ServiceRequest | Inquiry/request logged against a customer with category, priority and assigned staff, enforces the status workflow and resolution note (FR-04, FR-05). | UC-03, UC-05 | Ahmed Sherif |
| C05 | Complaint | Subclass of ServiceRequest with different behaviour: escalation, compensation and repeat-complaint check before closing (S-02). | UC-03, UC-05 | Ahmed Sherif |
| C06 | RequestStatusChange | Immutable time-stamped audit entry for every status, assignment or escalation change (FR-05). | UC-05 | Ahmed Sherif |
| C07 | StaffAccount | Represents staff identity, role and active status. Controls access and supports account administration. StaffRole is an enumeration in this simplified view. | UC-13 | Chihab Ben Khadra |
| C08 | AuditLogEntry | Records restricted actions and denied access attempts with a staff actor, outcome and timestamp. Entries remain immutable and retained for at least 12 months. | UC-13 | Chihab Ben Khadra |
| C09 | Segment | Stores loyalty tier, route, flight frequency and complaint criteria. Previews the matching customer count before saving a reusable segment. | UC-11 | Chihab Ben Khadra |
| C10 | Campaign | Targets one saved segment, generates personalized notifications and provides campaign results, including distinct converted-customer counts. | UC-12 | Chihab Ben Khadra |
| C11 | Notification | Records promotions, booking/flight updates, service responses and staff activity alerts in customer context. Tracks status and retries without duplicate campaign notifications. | UC-12, UC-14 | Chihab Ben Khadra |
| C12 | OperationalReport | Summarizes request volume, resolution time, complaint categories, loyalty distribution, campaign results and partner engagement for a date range. Exports PDF or CSV. | UC-15 | Chihab Ben Khadra |
| C13 | LoyaltyAccount | Holds a customer's point balance and membership tier, applies adjustments and recalculates the tier (FR-08, FR-09). | UC-08, UC-09 | Rizwanul Abidin Asim |
| C14 | PointAdjustment | A single manual change to a point balance, carrying the reason code, note and approval status. Rejected if either is missing, and held for senior review above 3,000 points (FR-09, NFR-07). | UC-09 | Rizwanul Abidin Asim |
| C15 | Feedback | A rating and category recorded against a booking or service interaction, with an optional comment (FR-06, FR-07). | UC-06, UC-07 | Rizwanul Abidin Asim |
| C16 | B2BAccount | Abstract parent of the two business account types. Holds organisation name, agreement dates, status and the interaction log, and enforces the expiry rule (FR-10). | UC-10 | Rizwanul Abidin Asim |
| C17 | CorporateClient | Business account with negotiated fare terms and an annual volume commitment. Specialises B2BAccount (S-04). | UC-10 | Rizwanul Abidin Asim |
| C18 | PartnerVendor | Supplier account such as catering or maintenance. Specialises B2BAccount but has no fare terms, which is why the two are separate subclasses. | UC-10 | Rizwanul Abidin Asim |
| C19 | InteractionEntry | Append-only record of one contact with a business account, giving the date and a summary (FR-10). | UC-10 | Rizwanul Abidin Asim |

## Scope ownership

- **Scope 1 — customer and service operations:** C01–C06, Ahmed Sherif.
- **Scope 2 — loyalty, feedback and business relationships:** C13–C19, Rizwanul Abidin Asim.
- **Scope 3 — marketing, communications, access and reporting:** C07–C12, Chihab Ben Khadra.

## Enumerations

- **ChangeType** — request audit events.
- **RequestStatus** — service request workflow states.
- **Priority** — service request urgency.
- **RequestCategory** — service request categories.
- **BookingStatus** — booking and travel states.
- **ImportStatus** — reservation import outcomes.
- **LoyaltyTier** — membership tiers shared by loyalty accounts and segmentation.
- **AdjustmentStatus** — point adjustment approval states.
- **FeedbackCategory** — customer feedback categories.
- **AccountStatus** — business account states.
- **PartnerCategory** — partner service categories.
- **StaffRole** — staff access roles.
- **AuditOutcome** — restricted action outcomes.
- **NotificationType** — communication categories.
- **NotificationStatus** — notification processing states.

CampaignStatus was defined in earlier scope 3 work but is not referenced by the current merged diagram. ExportFormat was removed; OperationalReport instead provides exportPDF() and exportCSV(). No new enum types or values were introduced during integration.
