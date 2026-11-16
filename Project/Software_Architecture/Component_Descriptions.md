# Component Descriptions

We identified six components. One is in the presentation layer, four are partitions in the application layer, and one is in the data layer.

**CO1 CRMWebUI (Presentation layer)** - shows the screens and forms used by CSRs, managers, marketing staff and the CRM administrator. It checks input format, sends requests to the application components and displays the results. It also builds the consolidated customer profile (UC-03) from CO2 and CO3 data. It supports all actor-facing use cases (UC-01 to UC-16) and the screen-step limits in NFR-04, NFR-08 and NFR-13.

**CO2 CustomerService (Application layer) -** creates, updates and searches customer profiles. It imports reservation records and provides read-only booking and travel history. It also logs service requests and complaints, moves them through the status workflow and keeps their audit trail. It supports FR-01 to FR-05, UC-01 to UC-05, UC-16, and NFR-01, NFR-03 and NFR-05.

**CO3 LoyaltyAndRelationships (Application layer) -** keeps loyalty balances and tiers, and it applies manual point adjustments with senior review. It records customer feedback and calculates satisfaction trends. It also manages corporate and partner accounts along with their interaction logs. It supports FR-06 to FR-10, UC-06 to UC-10, and NFR-06 to NFR-10.

**CO4 MarketingAndReporting (Application layer) -** defines customer segments and previews how many customers match. It runs campaigns and creates notification records, retrying them when they fail. It also produces the operational dashboard with PDF and CSV export. It supports FR-11, FR-12, FR-14 and FR-15, UC-11, UC-12, UC-14 and UC-15, and NFR-11 and NFR-14.

**CO5 AccessControl (Application layer) -** manages staff accounts and roles, and it authorizes restricted actions requested by the other components. It also writes the immutable audit log of restricted and denied actions. It supports FR-13, UC-13, and NFR-07 and NFR-12. It also provides the authenticated-staff precondition that every use case relies on.

**CO6 DataAccess (Data layer) -** stores and retrieves all persistent objects in PostgreSQL or Neon. It runs transactions and rollback, encrypts personal data at rest, and hides the database engine and connection settings from the layer above. It supports NFR-02, NFR-09 and NFR-15, and it provides persistence for CO2 to CO5.
