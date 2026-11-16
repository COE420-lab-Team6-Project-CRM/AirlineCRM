# Class Distribution

| **ID** | **Component Name**      | **Responsibilities**                                     | **Included Classes**                                                                                                                |
|--------|-------------------------|----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| CO1    | CRMWebUI                | User interaction and screen flow.                        | None from previous labs as those labs’ diagram models entity classes only; boundary classes (screens and forms) will be added here. |
| CO2    | CustomerService         | Customer profiles, booking history and service requests. | C01 Customer, C02 Booking, C03 ReservationImportRecord, C04 ServiceRequest, C05 Complaint, C06 RequestStatusChange                  |
| CO3    | LoyaltyAndRelationships | Loyalty, feedback and business accounts.                 | C13 LoyaltyAccount, C14 PointAdjustment, C15 Feedback, C16 B2BAccount, C17 CorporateClient, C18 PartnerVendor, C19 InteractionEntry |
| CO4    | MarketingAndReporting   | Segments, campaigns, notifications and reports.          | C09 Segment, C10 Campaign, C11 Notification, C12 OperationalReport                                                                  |
| CO5    | AccessControl           | Staff identity, permissions and audit log.               | C07 StaffAccount, C08 AuditLogEntry                                                                                                 |
| CO6    | DataAccess              | Persistence, transactions and database connection.       | None from Lab 5. Repository classes that save and load the objects above will be added here.                                        |
