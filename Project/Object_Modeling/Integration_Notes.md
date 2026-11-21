# Integration Notes

The main integration challenge was arranging the individual diagrams into a coherent overall shape with consistent sizing and readable connectors. We had already divided the business responsibilities into three scopes: scope 1 covers customer profiles, booking history and service requests, scope 2 covers feedback, loyalty and corporate or partner relationships, and scope 3 covers marketing campaigns, customer communications, staff access and operational reporting. This separation made the models easier to combine. We also used enumerations to keep categories, roles and statuses consistent across the scopes.

## Enumerations

- **ChangeType** — request audit events: STATUS_CHANGE, ASSIGNMENT, ESCALATION.
- **RequestStatus** — service request workflow states: OPEN, IN_PROGRESS, RESOLVED, CLOSED.
- **Priority** — service request urgency: LOW, MEDIUM, HIGH, URGENT.
- **RequestCategory** — service request categories: BILLING, BAGGAGE, FLIGHT_DELAY, SERVICE_QUALITY, OTHER.
- **BookingStatus** — booking and travel states: CONFIRMED, FLOWN, CANCELLED.
- **ImportStatus** — reservation import outcomes: PENDING, IMPORTED, REJECTED.
- **LoyaltyTier** — membership tiers shared by loyalty accounts and segmentation: SILVER, GOLD, PLATINUM.
- **AdjustmentStatus** — point adjustment approval states: PENDING, APPROVED, REJECTED.
- **FeedbackCategory** — customer feedback categories: FLIGHT_DELAY, CABIN_SERVICE, BAGGAGE, CHECK_IN, BOOKING, OTHER.
- **AccountStatus** — business account states: ACTIVE, EXPIRED.
- **PartnerCategory** — partner service categories: CATERING, MAINTENANCE.
- **StaffRole** — staff access roles: CSR, ACCOUNT_MANAGER, MARKETING_STAFF, AIRLINE_MANAGEMENT, CRM_ADMIN.
- **AuditOutcome** — restricted action outcomes: ALLOWED, DENIED.
- **NotificationType** — communication categories: PROMOTION, BOOKING_UPDATE, FLIGHT_CHANGE, SERVICE_RESPONSE, CUSTOMER_ACTIVITY.
- **NotificationStatus** — notification processing states: PENDING, SENT, FAILED.

CampaignStatus was defined in earlier scope 3 work but is not referenced by the current merged diagram. ExportFormat was removed; OperationalReport instead provides exportPDF() and exportCSV(). No new enum types or values were introduced during integration.

## Merge outcome

The merged diagram contains 19 unique classes and all 25 original connectors. Three Customer copies became one shared class. No relationships, dependencies or cardinalities were added.

## Contributions

| Contributor | Scope | Contribution |
|---|---|---|
| Ahmed Sherif | Scope 1 | Modeled customer profiles, bookings, reservation imports, service requests, complaints and request history; supplied inventory entries C01–C06 and the scope 1 diagram. |
| Rizwanul Abidin Asim | Scope 2 | Modeled loyalty, adjustments, feedback, corporate and partner accounts, and interactions; supplied inventory entries C13–C19 and the scope 2 diagram. |
| Chihab Ben Khadra | Scope 3 | Modeled staff access, audit logs, segments, campaigns, notifications and reporting; supplied inventory entries C07–C12 and the scope 3 diagram. |


GAI statement: GPT-6 was used to mind-map the three scopes together, decide their boundaries, and format the Markdown files.
