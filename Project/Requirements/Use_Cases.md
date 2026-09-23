Student 1 Contributions - b00098251
UC-01
UC-02
UC-03
UC-04
UC-05
UC-16
R-01
R-02
R-03
R-07
R-08

Student 2 Contributions - b00099008
UC-06
UC-07
UC-08
UC-09
UC-10
R-04
R-05
R-06

Student 3 Contributions - b00099449
UC-11
UC-12
UC-13
UC-14
UC-15

Team Consolidated Use Cases


UC-01 "Locate Customer" "CSR locates a customer's profile either by manually searching using name, ID, email, phone number, or booking reference, or by being directed to the profile automatically via a system-generated reference (e.g., a notification, alert, or escalation link). This use case establishes the customer context required before taking further action." [Primary Actor: Customer Service Representative] [Contributor: Ahmed Sherif]
UC-02 "Create or Update Customer Profile" "CSR adds a new customer to the system or edits an existing customer's contact/profile details." [Primary Actor: Customer Service Representative] [Contributor: Ahmed Sherif]
UC-03 "View Consolidated Customer Profile" "CSR opens a single unified view of a customer showing profile details, booking/travel summary, service request history, loyalty tier, and feedback ratings." [Primary Actor: Customer Service Representative] [Contributor: Ahmed Sherif]
UC-04 "View Booking & Travel History" "CSR views a customer's full, read-only list of reservations, flights, and cancellations in detail." [Primary Actor: Customer Service Representative] [Contributor: Ahmed Sherif]
UC-05 "Manage Service Request" "CSR logs a new inquiry/complaint against a customer, assigns category/priority/staff, and progresses it through the status workflow to closure with resolution notes." [Primary Actor: Customer Service Representative] [Contributor: Ahmed Sherif]
UC-06 "Record Customer Feedback" "CSR logs a customer's feedback against a booking or interaction, entering a rating, category, and optional comment." [Primary Actor: Customer Service Representative] [Contributor: Chihab Ben Khadra]
UC-07 "View Satisfaction Trends" "Management reviews satisfaction ratings aggregated over a selected period and category to spot emerging service issues." [Primary Actor: Airline Management] [Contributor: Chihab Ben Khadra]
UC-08 "View Loyalty Status" "CSR opens a customer's loyalty profile to check point balance, membership tier, tier history, and available rewards." [Primary Actor: Customer Service Representative] [Contributor: Chihab Ben Khadra]
UC-09 "Adjust Loyalty Points" "Authorized CSR manually changes a customer's point balance for a documented reason, such as service recovery or a correction." [Primary Actor: Customer Service Representative] [Contributor: Chihab Ben Khadra]
UC-10 "Manage B2B/Partner Account" "Account manager creates or updates a corporate or partner account record and logs engagement activity against it." [Primary Actor: Account Manager] [Contributor: Chihab Ben Khadra]
UC-11 "Create Customer Segment" "Marketing staff chooses rules such as loyalty tier, route, and complaint history, sees how many customers match, and saves this group for later use." [Primary Actor: Marketing Staff] [Contributor: Rizwanul Abidin Asim]
UC-12 "Run Marketing Campaign" "Marketing staff prepares a promotion for a saved customer group and reviews the results afterwards." [Primary Actor: Marketing Staff] [Contributor: Rizwanul Abidin Asim]
UC-13 "Manage User Accounts and Roles" "The CRM administrator adds, edits, or deactivates a staff account and sets what the staff member is allowed to do." [Primary Actor: CRM Administrator] [Contributor: Rizwanul Abidin Asim]
UC-14 "Receive Customer Activity Notifications" "The system notifies the CSR when a customer takes an action requiring attention, such as filing a complaint, submitting a service request, or triggering an escalation, so the CSR can respond promptly." [Primary Actor: Customer Service Representative] [Contributor: Rizwanul Abidin Asim]
UC-15 "View Operational Dashboard" "Airline management picks a date range, views request volume, resolution times, complaints, and campaign results, then exports the report in a desired format (PDF or CSV)." [Primary Actor: Airline Management] [Contributor: Rizwanul Abidin Asim]
UC-16 "Update Customer Profile" "CSR edits an existing customer’s contact/profile details."

### Relationships:
R-01 "UC-03 View Consolidated Customer Profile" "includes UC-01 Locate Customer  the customer must always be located first; mandatory in every execution."
R-02 "UC-03 View Consolidated Customer Profile" "extends to UC-04 View Booking & Travel History  CSR may optionally drill into full detail; conditional, not mandatory."
R-03 "UC-05 Manage Service Request" "includes UC-01 Locate Customer  a service request must always be attached to an already-located customer profile."
R-04 "UC-06 Record Customer Feedback" "includes UC-01 Locate Customer  feedback can only be recorded against an already-located customer profile."
R-05 "UC-09 Adjust Loyalty Points" "includes UC-01 Locate Customer  a point adjustment always modifies a specific, already-located customer's balance."
R-06 "UC-08 View Loyalty Status" "extends to UC-09 Adjust Loyalty Points  while reviewing loyalty status, the CSR may optionally decide to make an adjustment; conditional, not mandatory."
R-07 "UC-14 Track Customer Notifications" "extends to UC-01 Locate Customer  when a CSR reviews a notification about a customer action, they may optionally jump straight to that customer's record via the notification link; conditional, not mandatory."
R-08 "UC-16 Update Customer Profile" "includes UC-01 Locate Customer  the customer must always be located first before updating their profile."