Student 1 Contributions - b00098251
NFR-01
NFR-02
NFR-03
NFR-04
NFR-05

Student 2 Contributions - b00099008
NFR-06
NFR-07
NFR-08
NFR-09
NFR-10

Student 3 Contributions - b00099449
NFR-11
NFR-12
NFR-13
NFR-14
NFR-15

Team Consolidated Requirements

NFR-01 "Performance" "Customer search (by name, ID, email, phone, or booking reference) shall return matching results within 2 seconds for a customer database of up to 5,000 records under normal system load." [Contributor: Ahmed Sherif]
NFR-02 "Security" "All personally identifiable customer information (contact details, date of birth, travel history, and service request notes) shall be encrypted at rest and shall be viewable only by staff who are authenticated with an active session." [Contributor: Ahmed Sherif]
NFR-03 "Robustness" "The system shall handle incomplete, malformed, or partially failed reservation-import records without crashing or blocking the page: it shall exclude only the affected record(s) from a customer's booking and travel history view, display a data-quality notice, and still render the customer's remaining valid history." [Contributor: Ahmed Sherif]
NFR-04 "Usability" "A trained Customer Service Representative shall be able to log a new inquiry or complaint (customer link, category, priority, description) in no more than 4 screen steps and under 90 seconds." [Contributor: Ahmed Sherif]
NFR-05 "Verifiability" "The system shall log every service request status, assignment, and resolution-note change as a discrete, timestamped audit entry (staff ID, prior value, new value) so that a reviewer can independently reconstruct and verify the complete handling history of any service request." [Contributor: Ahmed Sherif]
NFR-06 "Performance" "The satisfaction trend view shall load within 3 seconds for a rolling twelve-month period, even when the underlying feedback dataset holds up to 5,000 records." [Contributor: Chihab Ben Khadra]
NFR-07 "Security" "Manual loyalty point adjustments shall be restricted to CSR accounts granted point-adjustment permission by the CRM administrator. Any adjustment above 3,000 points shall require review by a senior staff member before it takes effect." [Contributor: Chihab Ben Khadra]
NFR-08 "Usability" "A CSR shall be able to complete a point adjustment in no more than 3 screen steps, counted from opening the customer's loyalty view to saving the adjustment." [Contributor: Chihab Ben Khadra]
NFR-09 "Reliability" "Loyalty point balances and tier calculations shall remain consistent after a system restart or a failed transaction. An adjustment interrupted mid-transaction shall roll back completely, never leaving a partial change applied." [Contributor: Chihab Ben Khadra]
NFR-10 "Scalability" "The B2B account module shall support at least 2,000 active corporate and partner accounts, each with up to 50 logged interactions, without degradation in search or load times." [Contributor: Chihab Ben Khadra]
NFR-11 "Performance" "When a user (such as Marketing Staff) previews a customer segment, the system shall retrieve and show the number of matching customers within 10 seconds, even when the database holds 500,000 customers. The operations dashboard must load a full year of data within 5 seconds." [Contributor: Rizwanul Abidin Asim]
NFR-12 "Security" "Passwords stored must be encrypted (not in plain text). The server shall check the user's role before allowing any restricted action. Audit log entries shall be retained for 12 months and must not be altered or deleted." [Contributor: Rizwanul Abidin Asim]
NFR-13 "Usability" "A marketing staff member shall be able to create and save a customer segment within 5 minutes, with at least 8 out of 10 users able to do so without external help." [Contributor: Rizwanul Abidin Asim]
NFR-14 "Reliability" "The system shall create exactly one notification record per customer in a campaign, with none missing or repeated. In case of failure, the notification must be retried up to 3 times." [Contributor: Rizwanul Abidin Asim]
NFR-15 "Portability" "The system shall run on a local database (PostgreSQL via pgAdmin) and, when deployed, on a Neon database, without any changes to the code; only connection settings may differ." [Contributor: Rizwanul Abidin Asim]