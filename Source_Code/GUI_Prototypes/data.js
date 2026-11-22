// Sample data for the AirlineCRM GUI prototype. Field names follow the
// consolidated class diagram (Customer, Booking, ReservationImportRecord, LoyaltyAccount,
// PointAdjustment, ServiceRequest, Feedback, Notification, StaffAccount, AuditLogEntry).
// All people, accounts and records are fictional.
const DATA = {
  today: "2026-11-21",
  seniorThreshold: 3000,   // NFR-07: adjustments above this need Airline Management review
  // Prototype tier rule used by LoyaltyAccount.recalculateTier(): the tier follows the points balance.
  tierThresholds: [["Platinum", 60000], ["Gold", 25000], ["Silver", 0]],
  reasonCodes: ["Service recovery", "Goodwill", "Missing flight credit", "Correction"],

  // StaffAccount. passwordHash stands in for the server's one-way hash (NFR-12): the prototype never
  // stores a password in plain text. The sample sign-in details are listed in README.md.
  staff: [
    { staffId: "STF-0142", fullName: "Mariam Al Nuaimi", email: "mariam.alnuaimi@airlinecrm.example", role: "CSR", isActive: true,
      canAdjustPoints: true, shift: "Shift 06:00–14:00", closedToday: 4, passwordHash: "1563234b22bc5a",
      recent: ["CUS-004182", "CUS-001377", "CUS-003450", "CUS-005203"] },
    { staffId: "STF-0175", fullName: "Yousef Darwish", email: "yousef.darwish@airlinecrm.example", role: "CSR", isActive: true,
      canAdjustPoints: false, shift: "Shift 14:00–22:00", closedToday: 1, passwordHash: "1d87c0bda4fa3c",
      recent: ["CUS-002917", "CUS-005391"] },
    { staffId: "STF-0021", fullName: "Khalid Al Shamsi", email: "khalid.alshamsi@airlinecrm.example", role: "AIRLINE_MANAGEMENT", isActive: true,
      canAdjustPoints: false, shift: "Office 08:00–17:00", closedToday: 0, passwordHash: "0831bf7ee988de", recent: ["CUS-003450"] },
    // CRM administrator with every permission: the CSR screens with point adjustment and the Airline Management review queue
    { staffId: "admin", fullName: "CRM Administrator", email: "admin@airlinecrm.example", role: "CRM_ADMIN", isActive: true,
      canAdjustPoints: true, shift: "Office 08:00–17:00", closedToday: 0, passwordHash: "12fca0f4b65396",
      recent: ["CUS-004182", "CUS-001377", "CUS-003450", "CUS-005203"] },
    { staffId: "STF-0099", fullName: "Huda Saeed", email: "huda.saeed@airlinecrm.example", role: "CSR", isActive: false,
      canAdjustPoints: false, shift: "", closedToday: 0, passwordHash: "0047de68156d39", recent: [] },
    // staff who appear in records but have no sample sign-in
    { staffId: "STF-0087", fullName: "Faisal Rahman", role: "CSR", isActive: true, canAdjustPoints: true, passwordHash: null, recent: [] },
    { staffId: "STF-0061", fullName: "Lina Aziz", role: "CSR", isActive: true, canAdjustPoints: true, passwordHash: null, recent: [] },
  ],
  roleNames: { CSR: "Customer Service Representative", AIRLINE_MANAGEMENT: "Airline Management", CRM_ADMIN: "CRM Administrator" },

  customers: [
    { customerId: "CUS-004182", fullName: "Layla Kheder", email: "layla.kheder@mailbox.ae", phoneNumber: "+971 50 418 2290",
      mailingAddress: "Villa 14, Street 7, Al Khan, Sharjah", dateOfBirth: "1991-06-02", preferredLanguage: "Arabic", createdAt: "2021-03-14", lastUpdated: "2026-11-02" },
    { customerId: "CUS-002917", fullName: "Omar Kheder", email: "o.kheder@workmail.com", phoneNumber: "+971 55 291 7731",
      mailingAddress: "Apt 1203, Marina Gate 2, Dubai", dateOfBirth: "1986-11-19", preferredLanguage: "English", createdAt: "2019-08-30", lastUpdated: "2026-09-12" },
    { customerId: "CUS-005066", fullName: "Rana Saleh", email: "r.saleh.kheder@mailbox.ae", phoneNumber: "+971 56 506 6014",
      mailingAddress: "Building 3, Al Nahda 1, Dubai", dateOfBirth: "1999-02-27", preferredLanguage: "English", createdAt: "2024-01-09", lastUpdated: "2026-06-21" },
    { customerId: "CUS-001377", fullName: "Sara Haddad", email: "sara.haddad@mailbox.ae", phoneNumber: "+971 50 137 7452",
      mailingAddress: "Villa 2, Al Barsha 3, Dubai", dateOfBirth: "1994-09-08", preferredLanguage: "English", createdAt: "2020-05-17", lastUpdated: "2026-11-20" },
    { customerId: "CUS-003450", fullName: "Omar Al-Farsi", email: "omar.alfarsi@mailbox.om", phoneNumber: "+968 9 345 0218",
      mailingAddress: "Way 3021, Al Khuwair, Muscat", dateOfBirth: "1979-03-30", preferredLanguage: "Arabic", createdAt: "2018-12-02", lastUpdated: "2026-11-19" },
    { customerId: "CUS-004811", fullName: "Hessa Al Mansoori", email: "hessa.m@mailbox.ae", phoneNumber: "+971 52 481 1097",
      mailingAddress: "Al Mushrif, Abu Dhabi", dateOfBirth: "1988-07-14", preferredLanguage: "Arabic", createdAt: "2022-10-01", lastUpdated: "2026-10-28" },
    { customerId: "CUS-000958", fullName: "Daniel Okafor", email: "d.okafor@post.uk", phoneNumber: "+44 7700 095 812",
      mailingAddress: "18 Albion Road, Leeds", dateOfBirth: "1983-05-05", preferredLanguage: "English", createdAt: "2017-04-22", lastUpdated: "2026-08-30" },
    { customerId: "CUS-005203", fullName: "Priya Raman", email: "priya.raman@mailbox.in", phoneNumber: "+91 98 4520 3311",
      mailingAddress: "12 Lake View Road, Chennai", dateOfBirth: "1996-12-11", preferredLanguage: "English", createdAt: "2025-02-03", lastUpdated: "2026-11-18" },
    { customerId: "CUS-005391", fullName: "Noura Al Hashimi", email: "noura.hashimi@mailbox.ae", phoneNumber: "+971 54 539 1806",
      mailingAddress: "Al Raha Gardens, Abu Dhabi", dateOfBirth: "2001-04-23", preferredLanguage: "Arabic", createdAt: "2026-11-10", lastUpdated: "2026-11-10" },
  ],

  // Booking: imported from the reservation system, read-only in the CRM (FR-03).
  bookings: [
    // Layla Kheder
    { customerId: "CUS-004182", bookingReference: "K7Q2MD", flightNumber: "0417", origin: "DXB", destination: "BEY", departure: "2026-12-18 08:35", arrival: "2026-12-18 11:20", cabinClass: "Economy", status: "CONFIRMED", bookedOn: "2026-11-04" },
    { customerId: "CUS-004182", bookingReference: "R4TW9L", flightNumber: "0018", origin: "LHR", destination: "DXB", departure: "2026-10-30 21:40", arrival: "2026-10-31 07:55", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-08-19", note: "Delayed 3 h 10 m" },
    { customerId: "CUS-004182", bookingReference: "R4TW9L", flightNumber: "0011", origin: "DXB", destination: "LHR", departure: "2026-10-22 07:45", arrival: "2026-10-22 11:50", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-08-19" },
    { customerId: "CUS-004182", bookingReference: "H2PZ6C", flightNumber: "0652", origin: "DXB", destination: "CAI", departure: "2026-08-09 15:10", arrival: "2026-08-09 17:05", cabinClass: "Economy", status: "CANCELLED", bookedOn: "2026-07-02" },
    { customerId: "CUS-004182", bookingReference: "M8XN3B", flightNumber: "0418", origin: "BEY", destination: "DXB", departure: "2026-07-26 13:00", arrival: "2026-07-26 17:35", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-05-30" },
    { customerId: "CUS-004182", bookingReference: "M8XN3B", flightNumber: "0417", origin: "DXB", destination: "BEY", departure: "2026-07-12 08:35", arrival: "2026-07-12 11:20", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-05-30" },
    { customerId: "CUS-004182", bookingReference: "T5JD2V", flightNumber: "0904", origin: "DXB", destination: "IST", departure: "2026-04-03 02:15", arrival: "2026-04-03 06:30", cabinClass: "Premium Economy", status: "FLOWN", bookedOn: "2026-02-21" },
    { customerId: "CUS-004182", bookingReference: "B9LC7Q", flightNumber: "0233", origin: "DXB", destination: "MCT", departure: "2026-02-14 10:20", arrival: "2026-02-14 11:30", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-01-27" },
    { customerId: "CUS-004182", bookingReference: "W3FH8K", flightNumber: "0517", origin: "DXB", destination: "AMM", departure: "2025-12-27 09:05", arrival: "2025-12-27 11:40", cabinClass: "Economy", status: "FLOWN", bookedOn: "2025-11-15" },
    // Omar Kheder
    { customerId: "CUS-002917", bookingReference: "Z4RM7K", flightNumber: "0417", origin: "DXB", destination: "BEY", departure: "2026-12-24 08:35", arrival: "2026-12-24 11:20", cabinClass: "Business", status: "CONFIRMED", bookedOn: "2026-11-12" },
    { customerId: "CUS-002917", bookingReference: "Q8DM4T", flightNumber: "0905", origin: "IST", destination: "DXB", departure: "2026-11-08 08:05", arrival: "2026-11-08 13:10", cabinClass: "Business", status: "FLOWN", bookedOn: "2026-10-01", note: "Delayed 2 h 25 m" },
    { customerId: "CUS-002917", bookingReference: "Q8DM4T", flightNumber: "0904", origin: "DXB", destination: "IST", departure: "2026-11-03 02:15", arrival: "2026-11-03 06:30", cabinClass: "Business", status: "FLOWN", bookedOn: "2026-10-01" },
    { customerId: "CUS-002917", bookingReference: "C2HV8N", flightNumber: "0018", origin: "LHR", destination: "DXB", departure: "2026-06-20 21:40", arrival: "2026-06-21 07:55", cabinClass: "Business", status: "FLOWN", bookedOn: "2026-04-28" },
    { customerId: "CUS-002917", bookingReference: "C2HV8N", flightNumber: "0011", origin: "DXB", destination: "LHR", departure: "2026-06-14 07:45", arrival: "2026-06-14 11:50", cabinClass: "Business", status: "FLOWN", bookedOn: "2026-04-28" },
    // Rana Saleh
    { customerId: "CUS-005066", bookingReference: "V8QE2D", flightNumber: "0652", origin: "DXB", destination: "CAI", departure: "2026-12-30 15:10", arrival: "2026-12-30 17:05", cabinClass: "Economy", status: "CONFIRMED", bookedOn: "2026-11-12" },
    { customerId: "CUS-005066", bookingReference: "G6TN3A", flightNumber: "0518", origin: "AMM", destination: "DXB", departure: "2026-04-17 13:00", arrival: "2026-04-17 17:20", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-03-01" },
    { customerId: "CUS-005066", bookingReference: "G6TN3A", flightNumber: "0517", origin: "DXB", destination: "AMM", departure: "2026-04-10 09:05", arrival: "2026-04-10 11:40", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-03-01" },
    // Sara Haddad
    { customerId: "CUS-001377", bookingReference: "F3KA9P", flightNumber: "0016", origin: "LHR", destination: "DXB", departure: "2026-11-15 14:20", arrival: "2026-11-16 00:35", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-09-20", note: "Bag damaged on arrival" },
    { customerId: "CUS-001377", bookingReference: "F3KA9P", flightNumber: "0011", origin: "DXB", destination: "LHR", departure: "2026-11-09 07:45", arrival: "2026-11-09 11:50", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-09-20" },
    { customerId: "CUS-001377", bookingReference: "L5BN2W", flightNumber: "0234", origin: "MCT", destination: "DXB", departure: "2026-07-06 12:40", arrival: "2026-07-06 13:50", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-06-11" },
    { customerId: "CUS-001377", bookingReference: "L5BN2W", flightNumber: "0233", origin: "DXB", destination: "MCT", departure: "2026-07-03 10:20", arrival: "2026-07-03 11:30", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-06-11" },
    // Omar Al-Farsi
    { customerId: "CUS-003450", bookingReference: "J7ZT4E", flightNumber: "0236", origin: "MCT", destination: "DXB", departure: "2026-12-05 07:10", arrival: "2026-12-05 08:20", cabinClass: "Business", status: "CANCELLED", bookedOn: "2026-10-14" },
    { customerId: "CUS-003450", bookingReference: "E5PW9C", flightNumber: "0233", origin: "DXB", destination: "MCT", departure: "2026-11-11 10:20", arrival: "2026-11-11 11:30", cabinClass: "Business", status: "FLOWN", bookedOn: "2026-10-20", note: "Moved to Economy, aircraft change" },
    { customerId: "CUS-003450", bookingReference: "E5PW9C", flightNumber: "0234", origin: "MCT", destination: "DXB", departure: "2026-11-04 12:40", arrival: "2026-11-04 13:50", cabinClass: "Business", status: "FLOWN", bookedOn: "2026-10-20" },
    { customerId: "CUS-003450", bookingReference: "S3YD6R", flightNumber: "0018", origin: "LHR", destination: "DXB", departure: "2026-09-09 21:40", arrival: "2026-09-10 07:55", cabinClass: "Business", status: "FLOWN", bookedOn: "2026-07-30" },
    { customerId: "CUS-003450", bookingReference: "S3YD6R", flightNumber: "0011", origin: "DXB", destination: "LHR", departure: "2026-09-02 07:45", arrival: "2026-09-02 11:50", cabinClass: "Business", status: "FLOWN", bookedOn: "2026-07-30" },
    { customerId: "CUS-003450", bookingReference: "K9AF2L", flightNumber: "0904", origin: "DXB", destination: "IST", departure: "2026-05-19 02:15", arrival: "2026-05-19 06:30", cabinClass: "Business", status: "FLOWN", bookedOn: "2026-04-02" },
    // Hessa Al Mansoori
    { customerId: "CUS-004811", bookingReference: "U7CB4M", flightNumber: "0653", origin: "CAI", destination: "DXB", departure: "2026-10-03 18:40", arrival: "2026-10-03 23:50", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-08-22", note: "Delayed 1 h 35 m" },
    { customerId: "CUS-004811", bookingReference: "U7CB4M", flightNumber: "0652", origin: "DXB", destination: "CAI", departure: "2026-09-26 15:10", arrival: "2026-09-26 17:05", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-08-22" },
    // Daniel Okafor
    { customerId: "CUS-000958", bookingReference: "X2LM8Q", flightNumber: "0011", origin: "DXB", destination: "LHR", departure: "2026-08-24 07:45", arrival: "2026-08-24 11:50", cabinClass: "Premium Economy", status: "FLOWN", bookedOn: "2026-06-30" },
    { customerId: "CUS-000958", bookingReference: "X2LM8Q", flightNumber: "0018", origin: "LHR", destination: "DXB", departure: "2026-08-10 21:40", arrival: "2026-08-11 07:55", cabinClass: "Premium Economy", status: "FLOWN", bookedOn: "2026-06-30" },
    { customerId: "CUS-000958", bookingReference: "D4NS6V", flightNumber: "0011", origin: "DXB", destination: "LHR", departure: "2026-02-09 07:45", arrival: "2026-02-09 11:50", cabinClass: "Economy", status: "FLOWN", bookedOn: "2025-12-12" },
    { customerId: "CUS-000958", bookingReference: "D4NS6V", flightNumber: "0018", origin: "LHR", destination: "DXB", departure: "2026-02-02 21:40", arrival: "2026-02-03 07:55", cabinClass: "Economy", status: "FLOWN", bookedOn: "2025-12-12" },
    // Priya Raman
    { customerId: "CUS-005203", bookingReference: "Y5GK3R", flightNumber: "0545", origin: "DXB", destination: "MAA", departure: "2026-11-01 21:50", arrival: "2026-11-02 03:10", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-09-07" },
    { customerId: "CUS-005203", bookingReference: "Y5GK3R", flightNumber: "0544", origin: "MAA", destination: "DXB", departure: "2026-10-18 04:15", arrival: "2026-10-18 07:05", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-09-07" },
    // Noura Al Hashimi has no bookings yet (UC-04 A3)
  ],
  // ReservationImportRecord rows that failed validation and are excluded from the history (NFR-03).
  excludedImports: [
    { importId: "IMP-24117", customerId: "CUS-004182", sourceSystem: "Reservation system", bookingReference: "P6VR1S", errorMessage: "Departure date missing" },
  ],
  cities: { DXB: "Dubai", BEY: "Beirut", LHR: "London Heathrow", CAI: "Cairo", IST: "Istanbul", MCT: "Muscat", AMM: "Amman", MAA: "Chennai" },

  // LoyaltyAccount, one per customer
  loyaltyAccounts: [
    { accountId: "LOY-118204", customerId: "CUS-004182", pointsBalance: 18450, tier: "Silver", enrolledOn: "2021-03-14", tierHistory: [
      { date: "2025-01-31", tier: "Silver", reason: "Annual review: balance below 25,000 points" },
      { date: "2023-01-31", tier: "Gold", reason: "Annual review: balance reached 25,000 points" },
      { date: "2021-03-14", tier: "Silver", reason: "Enrolled in the loyalty programme" }] },
    { accountId: "LOY-097731", customerId: "CUS-002917", pointsBalance: 41200, tier: "Gold", enrolledOn: "2019-08-30", tierHistory: [
      { date: "2022-01-31", tier: "Gold", reason: "Annual review: balance reached 25,000 points" },
      { date: "2019-08-30", tier: "Silver", reason: "Enrolled in the loyalty programme" }] },
    { accountId: "LOY-150660", customerId: "CUS-005066", pointsBalance: 6300, tier: "Silver", enrolledOn: "2024-01-09", tierHistory: [
      { date: "2024-01-09", tier: "Silver", reason: "Enrolled in the loyalty programme" }] },
    { accountId: "LOY-104377", customerId: "CUS-001377", pointsBalance: 32800, tier: "Gold", enrolledOn: "2020-05-17", tierHistory: [
      { date: "2024-01-31", tier: "Gold", reason: "Annual review: balance reached 25,000 points" },
      { date: "2020-05-17", tier: "Silver", reason: "Enrolled in the loyalty programme" }] },
    { accountId: "LOY-089450", customerId: "CUS-003450", pointsBalance: 74900, tier: "Platinum", enrolledOn: "2018-12-02", tierHistory: [
      { date: "2023-01-31", tier: "Platinum", reason: "Annual review: balance reached 60,000 points" },
      { date: "2020-01-31", tier: "Gold", reason: "Annual review: balance reached 25,000 points" },
      { date: "2018-12-02", tier: "Silver", reason: "Enrolled in the loyalty programme" }] },
    { accountId: "LOY-138110", customerId: "CUS-004811", pointsBalance: 9850, tier: "Silver", enrolledOn: "2022-10-01", tierHistory: [
      { date: "2022-10-01", tier: "Silver", reason: "Enrolled in the loyalty programme" }] },
    { accountId: "LOY-090958", customerId: "CUS-000958", pointsBalance: 27400, tier: "Gold", enrolledOn: "2017-04-22", tierHistory: [
      { date: "2021-01-31", tier: "Gold", reason: "Annual review: balance reached 25,000 points" },
      { date: "2017-04-22", tier: "Silver", reason: "Enrolled in the loyalty programme" }] },
    { accountId: "LOY-152203", customerId: "CUS-005203", pointsBalance: 4120, tier: "Silver", enrolledOn: "2025-02-03", tierHistory: [
      { date: "2025-02-03", tier: "Silver", reason: "Enrolled in the loyalty programme" }] },
    { accountId: "LOY-153391", customerId: "CUS-005391", pointsBalance: 0, tier: "Silver", enrolledOn: "2026-11-10", tierHistory: [
      { date: "2026-11-10", tier: "Silver", reason: "Enrolled in the loyalty programme" }] },
  ],

  // PointAdjustment, newest first. Above 3,000 points: PENDING until Airline Management approves or rejects.
  adjustments: [
    { adjustmentId: "ADJ-31940", customerId: "CUS-003450", adjustedAt: "2026-11-20 15:12", points: 5000, reasonCode: "Service recovery", note: "Moved from Business to Economy on flight 0233 on 2026-11-11 (aircraft change)", requestedBy: "STF-0142", status: "PENDING" },
    { adjustmentId: "ADJ-31911", customerId: "CUS-001377", adjustedAt: "2026-11-19 11:47", points: 1500, reasonCode: "Service recovery", note: "Bag damaged on flight 0016 on 2026-11-15; request SR-21447", requestedBy: "STF-0142", status: "APPROVED" },
    { adjustmentId: "ADJ-31876", customerId: "CUS-000958", adjustedAt: "2026-11-18 09:30", points: -800, reasonCode: "Correction", note: "Duplicate credit for flight 0011 on 2026-08-24", requestedBy: "STF-0142", status: "APPROVED" },
    { adjustmentId: "ADJ-31802", customerId: "CUS-004811", adjustedAt: "2026-11-16 13:05", points: 3500, reasonCode: "Goodwill", note: "Delay on flight 0653 CAI–DXB on 2026-10-03", requestedBy: "STF-0142", status: "REJECTED",
      reviewedBy: "STF-0021", reviewedAt: "2026-11-17 10:20", reviewNote: "Delay under 2 hours; goodwill above 3,000 points is not justified" },
    { adjustmentId: "ADJ-31779", customerId: "CUS-005203", adjustedAt: "2026-11-14 16:58", points: 750, reasonCode: "Missing flight credit", note: "Flight 0544 on 2026-10-18 not credited", requestedBy: "STF-0142", status: "APPROVED" },
    { adjustmentId: "ADJ-30772", customerId: "CUS-004182", adjustedAt: "2026-02-15 10:42", points: 500, reasonCode: "Missing flight credit", note: "Flight 0233 on 2026-02-14 not credited", requestedBy: "STF-0087", status: "APPROVED" },
    { adjustmentId: "ADJ-27105", customerId: "CUS-004182", adjustedAt: "2025-09-03 16:08", points: -1200, reasonCode: "Correction", note: "Duplicate credit for booking W1KD4R", requestedBy: "STF-0142", status: "APPROVED" },
    { adjustmentId: "ADJ-25560", customerId: "CUS-004182", adjustedAt: "2025-06-21 12:30", points: 4000, reasonCode: "Service recovery", note: "Missed connection; request SR-18820", requestedBy: "STF-0061", status: "REJECTED",
      reviewedBy: "STF-0021", reviewedAt: "2025-06-23 09:02", reviewNote: "Compensated with a travel voucher instead" },
  ],

  // Feedback (UC-06), shown on the profile overview
  feedback: [
    { feedbackId: "FB-9031", customerId: "CUS-004182", bookingReference: "R4TW9L", rating: 2, category: "Punctuality", comment: "Three-hour delay and no meal served", submittedAt: "2026-11-21" },
    { feedbackId: "FB-8740", customerId: "CUS-004182", bookingReference: "H2PZ6C", rating: 2, category: "Customer service", comment: "Refund for the cancelled flight took five weeks", submittedAt: "2026-08-28" },
    { feedbackId: "FB-9002", customerId: "CUS-001377", bookingReference: "F3KA9P", rating: 1, category: "Baggage", comment: "Suitcase arrived with a broken handle", submittedAt: "2026-11-16" },
    { feedbackId: "FB-8955", customerId: "CUS-003450", bookingReference: "S3YD6R", rating: 5, category: "Cabin crew", comment: "", submittedAt: "2026-09-11" },
    { feedbackId: "FB-8977", customerId: "CUS-002917", bookingReference: "Q8DM4T", rating: 3, category: "Punctuality", comment: "Late departure from Istanbul", submittedAt: "2026-11-09" },
  ],

  notifications: [
    { notificationId: "NTF-77310", type: "FLIGHT_CHANGE", body: "Flight 0417 on 2026-12-18 retimed to 09:50", customerId: "CUS-004182", at: "08:12", status: "FAILED", retryCount: 3 },
    { notificationId: "NTF-77305", type: "CUSTOMER_ACTIVITY", body: "Feedback rated 2/5 on booking R4TW9L", customerId: "CUS-004182", at: "08:03", status: "SENT", retryCount: 0 },
    { notificationId: "NTF-77302", type: "SERVICE_RESPONSE", body: "Customer replied to request SR-21447", customerId: "CUS-001377", at: "07:55", status: "SENT", retryCount: 0 },
    { notificationId: "NTF-77288", type: "BOOKING_UPDATE", body: "Booking J7ZT4E cancelled by the customer", customerId: "CUS-003450", at: "07:31", status: "SENT", retryCount: 0 },
  ],

  // ServiceRequest (FR-04): assignedTo is the handling staff member
  requests: [
    { requestId: "SR-21447", customerId: "CUS-001377", category: "BAGGAGE", priority: "HIGH", status: "IN_PROGRESS", createdAt: "2026-11-18", assignedTo: "STF-0142", description: "Suitcase damaged on flight 0016; repeat complaint" },
    { requestId: "SR-21502", customerId: "CUS-004182", category: "FLIGHT_DELAY", priority: "MEDIUM", status: "OPEN", createdAt: "2026-11-02", assignedTo: "STF-0142", description: "Compensation for the 3 h delay on flight 0018" },
    { requestId: "SR-21533", customerId: "CUS-003450", category: "BILLING", priority: "LOW", status: "OPEN", createdAt: "2026-11-19", assignedTo: "STF-0142", description: "Fare difference after the cabin change on 0233" },
    { requestId: "SR-21540", customerId: "CUS-000958", category: "SERVICE_QUALITY", priority: "MEDIUM", status: "IN_PROGRESS", createdAt: "2026-11-20", assignedTo: "STF-0142", description: "Seat not as booked on flight 0011" },
    { requestId: "SR-21551", customerId: "CUS-004811", category: "OTHER", priority: "LOW", status: "OPEN", createdAt: "2026-11-21", assignedTo: "STF-0142", description: "Update of the mailing address" },
    { requestId: "SR-21498", customerId: "CUS-002917", category: "FLIGHT_DELAY", priority: "MEDIUM", status: "IN_PROGRESS", createdAt: "2026-11-09", assignedTo: "STF-0175", description: "Missed meeting after the delay from Istanbul" },
    { requestId: "SR-21560", customerId: "CUS-005391", category: "OTHER", priority: "LOW", status: "OPEN", createdAt: "2026-11-20", assignedTo: "STF-0175", description: "Membership card not received" },
    { requestId: "SR-20915", customerId: "CUS-004182", category: "BILLING", priority: "MEDIUM", status: "CLOSED", createdAt: "2026-08-10", assignedTo: "STF-0087", description: "Refund for cancelled booking H2PZ6C" },
    { requestId: "SR-18820", customerId: "CUS-004182", category: "FLIGHT_DELAY", priority: "HIGH", status: "CLOSED", createdAt: "2025-06-20", assignedTo: "STF-0061", description: "Missed connection" },
  ],

  auditLog: [],   // AuditLogEntry: denied sign-ins and denied restricted actions are appended here (FR-13, NFR-12)
};

// airport positions (lon, lat) for the route map
DATA.airports = {
  DXB: [55.36, 25.25], BEY: [35.49, 33.82], LHR: [-0.45, 51.47], CAI: [31.41, 30.12],
  IST: [28.81, 40.98], MCT: [58.28, 23.59], AMM: [35.99, 31.72], MAA: [80.17, 12.99],
};

// consistency checks
(() => {
  const D = DATA, ids = new Set(D.customers.map((c) => c.customerId));
  const tierOf = (pts) => D.tierThresholds.find(([, min]) => pts >= min)[0];
  console.assert(D.loyaltyAccounts.every((a) => ids.has(a.customerId) && a.tier === tierOf(a.pointsBalance)), "every account's tier follows its balance");
  console.assert(D.customers.every((c) => D.loyaltyAccounts.some((a) => a.customerId === c.customerId)), "one loyalty account per customer");
  console.assert(D.bookings.every((b) => ids.has(b.customerId) && D.airports[b.origin] && D.airports[b.destination] && (b.origin === "DXB" || b.destination === "DXB")), "bookings: known customer, known airports, via the DXB hub");
  console.assert(D.customers.every((c) => { const bs = D.bookings.filter((b) => b.customerId === c.customerId); return bs.every((b, i) => i === 0 || bs[i - 1].departure >= b.departure); }), "bookings newest first per customer");
  console.assert(D.adjustments.filter((a) => a.status !== "APPROVED" || a.reviewedBy).every((a) => a.points > D.seniorThreshold), "pending/reviewed only above the threshold");
  console.assert([...D.requests, ...D.notifications, ...D.feedback].every((r) => ids.has(r.customerId)), "records point at known customers");
})();
