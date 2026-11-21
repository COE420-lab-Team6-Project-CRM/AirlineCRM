// Sample data for the AirlineCRM GUI prototype. Field names follow the
// consolidated class diagram (Customer, Booking, LoyaltyAccount, PointAdjustment,
// ServiceRequest, Notification, StaffAccount). All people and records are fictional.
const DATA = {
  today: "2026-11-21",
  staff: { staffId: "STF-0142", name: "Mariam Al Nuaimi", role: "CSR", canAdjustPoints: true },

  customers: [
    { customerId: "CUS-004182", fullName: "Layla Kheder", email: "layla.kheder@mailbox.ae", phoneNumber: "+971 50 418 2290",
      mailingAddress: "Villa 14, Street 7, Al Khan, Sharjah", dateOfBirth: "1991-06-02", preferredLanguage: "Arabic",
      createdAt: "2021-03-14", lastUpdated: "2026-11-02", tier: "Silver", lastFlight: "2026-10-30" },
    { customerId: "CUS-002917", fullName: "Omar Kheder", email: "o.kheder@workmail.com", phoneNumber: "+971 55 291 7731",
      mailingAddress: "Apt 1203, Marina Gate 2, Dubai", dateOfBirth: "1986-11-19", preferredLanguage: "English",
      createdAt: "2019-08-30", lastUpdated: "2026-09-12", tier: "Gold", lastFlight: "2026-11-08" },
    { customerId: "CUS-005066", fullName: "Rana Saleh", email: "r.saleh.kheder@mailbox.ae", phoneNumber: "+971 56 506 6014",
      mailingAddress: "Building 3, Al Nahda 1, Dubai", dateOfBirth: "1999-02-27", preferredLanguage: "English",
      createdAt: "2024-01-09", lastUpdated: "2026-06-21", tier: "Silver", lastFlight: "2026-04-17" },
    { customerId: "CUS-001377", fullName: "Sara Haddad", email: "sara.haddad@mailbox.ae", phoneNumber: "+971 50 137 7452",
      mailingAddress: "Villa 2, Al Barsha 3, Dubai", dateOfBirth: "1994-09-08", preferredLanguage: "English",
      createdAt: "2020-05-17", lastUpdated: "2026-11-20", tier: "Gold", lastFlight: "2026-11-15" },
    { customerId: "CUS-003450", fullName: "Omar Al-Farsi", email: "omar.alfarsi@mailbox.om", phoneNumber: "+968 9 345 0218",
      mailingAddress: "Way 3021, Al Khuwair, Muscat", dateOfBirth: "1979-03-30", preferredLanguage: "Arabic",
      createdAt: "2018-12-02", lastUpdated: "2026-11-19", tier: "Platinum", lastFlight: "2026-11-11" },
    { customerId: "CUS-004811", fullName: "Hessa Al Mansoori", email: "hessa.m@mailbox.ae", phoneNumber: "+971 52 481 1097",
      mailingAddress: "Al Mushrif, Abu Dhabi", dateOfBirth: "1988-07-14", preferredLanguage: "Arabic",
      createdAt: "2022-10-01", lastUpdated: "2026-10-28", tier: "Silver", lastFlight: "2026-10-03" },
    { customerId: "CUS-000958", fullName: "Daniel Okafor", email: "d.okafor@post.uk", phoneNumber: "+44 7700 095 812",
      mailingAddress: "18 Albion Road, Leeds", dateOfBirth: "1983-05-05", preferredLanguage: "English",
      createdAt: "2017-04-22", lastUpdated: "2026-08-30", tier: "Gold", lastFlight: "2026-08-24" },
    { customerId: "CUS-005203", fullName: "Priya Raman", email: "priya.raman@mailbox.in", phoneNumber: "+91 98 4520 3311",
      mailingAddress: "12 Lake View Road, Chennai", dateOfBirth: "1996-12-11", preferredLanguage: "English",
      createdAt: "2025-02-03", lastUpdated: "2026-11-18", tier: "Silver", lastFlight: "2026-11-01" },
  ],

  // booking references per customer, used by the search (booking reference is a search key, FR-02)
  bookingRefs: {
    "CUS-004182": ["K7Q2MD", "R4TW9L", "H2PZ6C", "M8XN3B", "T5JD2V", "B9LC7Q", "W3FH8K", "P6VR1S", "N2YB5G"],
    "CUS-002917": ["Q8DM4T"], "CUS-001377": ["F3KA9P", "L5BN2W"], "CUS-003450": ["J7ZT4E"],
  },

  // Layla's bookings, most recent first (FR-03). One imported record is invalid and excluded (NFR-03).
  bookings: [
    { bookingReference: "K7Q2MD", flightNumber: "0417", origin: "DXB", destination: "BEY", departure: "2026-12-18 08:35", arrival: "2026-12-18 11:20", cabinClass: "Economy", status: "CONFIRMED", bookedOn: "2026-11-04" },
    { bookingReference: "R4TW9L", flightNumber: "0018", origin: "LHR", destination: "DXB", departure: "2026-10-30 21:40", arrival: "2026-10-31 07:55", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-08-19", note: "Delayed 3 h 10 m" },
    { bookingReference: "R4TW9L", flightNumber: "0011", origin: "DXB", destination: "LHR", departure: "2026-10-22 07:45", arrival: "2026-10-22 11:50", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-08-19" },
    { bookingReference: "H2PZ6C", flightNumber: "0652", origin: "DXB", destination: "CAI", departure: "2026-08-09 15:10", arrival: "2026-08-09 17:05", cabinClass: "Economy", status: "CANCELLED", bookedOn: "2026-07-02" },
    { bookingReference: "M8XN3B", flightNumber: "0418", origin: "BEY", destination: "DXB", departure: "2026-07-26 13:00", arrival: "2026-07-26 17:35", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-05-30" },
    { bookingReference: "M8XN3B", flightNumber: "0417", origin: "DXB", destination: "BEY", departure: "2026-07-12 08:35", arrival: "2026-07-12 11:20", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-05-30" },
    { bookingReference: "T5JD2V", flightNumber: "0904", origin: "DXB", destination: "IST", departure: "2026-04-03 02:15", arrival: "2026-04-03 06:30", cabinClass: "Premium Economy", status: "FLOWN", bookedOn: "2026-02-21" },
    { bookingReference: "B9LC7Q", flightNumber: "0233", origin: "DXB", destination: "MCT", departure: "2026-02-14 10:20", arrival: "2026-02-14 11:30", cabinClass: "Economy", status: "FLOWN", bookedOn: "2026-01-27" },
    { bookingReference: "W3FH8K", flightNumber: "0517", origin: "DXB", destination: "AMM", departure: "2025-12-27 09:05", arrival: "2025-12-27 11:40", cabinClass: "Economy", status: "FLOWN", bookedOn: "2025-11-15" },
  ],
  excludedImports: [{ importId: "IMP-24117", sourceSystem: "Reservation system", bookingReference: "P6VR1S", errorMessage: "Departure date missing" }],
  cities: { DXB: "Dubai", BEY: "Beirut", LHR: "London Heathrow", CAI: "Cairo", IST: "Istanbul", MCT: "Muscat", AMM: "Amman" },

  loyalty: {
    accountId: "LOY-118204", customerId: "CUS-004182", pointsBalance: 18450, tier: "Silver", enrolledOn: "2021-03-14",
    tierHistory: [
      { date: "2025-01-31", tier: "Silver", reason: "Annual review: Gold qualification not met in 2024" },
      { date: "2023-01-31", tier: "Gold", reason: "Annual review: Gold qualification met in 2022" },
      { date: "2021-03-14", tier: "Silver", reason: "Enrolled in the loyalty programme" },
    ],
    adjustments: [
      { adjustmentId: "ADJ-30772", adjustedAt: "2026-02-15 10:42", points: 500, reasonCode: "Missing flight credit", note: "Flight 0233 on 2026-02-14 not credited", by: "STF-0087", status: "APPROVED" },
      { adjustmentId: "ADJ-27105", adjustedAt: "2025-09-03 16:08", points: -1200, reasonCode: "Correction", note: "Duplicate credit for booking W1KD4R", by: "STF-0142", status: "APPROVED" },
      { adjustmentId: "ADJ-25560", adjustedAt: "2025-06-21 12:30", points: 4000, reasonCode: "Service recovery", note: "Missed connection in IST; request SR-18820", by: "STF-0061", status: "REJECTED" },
    ],
  },
  reasonCodes: ["Service recovery", "Goodwill", "Missing flight credit", "Correction"],
  seniorThreshold: 3000,   // NFR-07: adjustments above this need Airline Management review

  // home page
  notifications: [
    { notificationId: "NTF-77310", type: "FLIGHT_CHANGE", body: "Flight 0417 on 2026-12-18 retimed to 09:50", customerId: "CUS-004182", at: "08:12", status: "FAILED", retryCount: 3 },
    { notificationId: "NTF-77305", type: "CUSTOMER_ACTIVITY", body: "Feedback rated 2/5 on booking R4TW9L", customerId: "CUS-004182", at: "08:03", status: "SENT", retryCount: 0 },
    { notificationId: "NTF-77302", type: "SERVICE_RESPONSE", body: "Customer replied to request SR-21447", customerId: "CUS-001377", at: "07:55", status: "SENT", retryCount: 0 },
    { notificationId: "NTF-77288", type: "BOOKING_UPDATE", body: "Booking J7ZT4E cancelled by the customer", customerId: "CUS-003450", at: "07:31", status: "SENT", retryCount: 0 },
  ],
  requests: [
    { requestId: "SR-21447", customerId: "CUS-001377", category: "BAGGAGE", priority: "HIGH", status: "IN_PROGRESS", createdAt: "2026-11-18" },
    { requestId: "SR-21502", customerId: "CUS-004182", category: "FLIGHT_DELAY", priority: "MEDIUM", status: "OPEN", createdAt: "2026-11-02" },
    { requestId: "SR-21533", customerId: "CUS-003450", category: "BILLING", priority: "LOW", status: "OPEN", createdAt: "2026-11-19" },
    { requestId: "SR-21540", customerId: "CUS-000958", category: "SERVICE_QUALITY", priority: "MEDIUM", status: "IN_PROGRESS", createdAt: "2026-11-20" },
    { requestId: "SR-21551", customerId: "CUS-004811", category: "OTHER", priority: "LOW", status: "OPEN", createdAt: "2026-11-21" },
  ],
  myAdjustments: [
    { adjustmentId: "ADJ-31940", customerId: "CUS-003450", points: 5000, status: "PENDING", adjustedAt: "2026-11-20" },
    { adjustmentId: "ADJ-31911", customerId: "CUS-001377", points: 1500, status: "APPROVED", adjustedAt: "2026-11-19" },
    { adjustmentId: "ADJ-31876", customerId: "CUS-000958", points: -800, status: "APPROVED", adjustedAt: "2026-11-18" },
    { adjustmentId: "ADJ-31802", customerId: "CUS-004811", points: 3500, status: "REJECTED", adjustedAt: "2026-11-16" },
    { adjustmentId: "ADJ-31779", customerId: "CUS-005203", points: 750, status: "APPROVED", adjustedAt: "2026-11-14" },
  ],
  recent: ["CUS-004182", "CUS-001377", "CUS-003450", "CUS-005203"],
  closedToday: 4,
};

// consistency checks
console.assert(DATA.bookings.every((b, i, a) => i === 0 || a[i - 1].departure >= b.departure), "bookings newest first");
console.assert(DATA.myAdjustments.filter(a => a.status === "PENDING").every(a => a.points > DATA.seniorThreshold), "pending ones exceed threshold");
console.assert(DATA.loyalty.adjustments.filter(a => a.status === "REJECTED").every(a => a.points > DATA.seniorThreshold), "rejected only via senior review");

// airport positions (lon, lat) for the route map
DATA.airports = {
  DXB: [55.36, 25.25], BEY: [35.49, 33.82], LHR: [-0.45, 51.47], CAI: [31.41, 30.12],
  IST: [28.81, 40.98], MCT: [58.28, 23.59], AMM: [35.99, 31.72],
};
