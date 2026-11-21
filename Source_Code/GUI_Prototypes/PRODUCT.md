# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Customer Service Representatives (CSRs) of an airline, working long shifts at a desktop in a contact centre, usually on the phone with the customer while they use the system. The secondary audience for this prototype is the COE420 course staff, who read the screens in the final report (Section 9) and in the project discussion.

## Product Purpose
AirlineCRM is the team's Airline Customer Relationship Management system (COE420, Team 6). It brings customer profiles, imported bookings, service requests, feedback, loyalty and notifications into one place. This prototype shows the CSR's three major use cases: UC-01 Locate Customer, UC-04 View Booking & Travel History and UC-09 Adjust Loyalty Points, plus a home page. Success: the screens look like a real, shipping airline product, and every screen is clearly tied to its use case and to the class diagram.

## Positioning
One place where a CSR finds the caller by any identifier (name, customer ID, email, phone, booking reference), sees their full travel history even when an import failed, and adjusts loyalty points with built-in controls: a reason code and note are required, and anything above 3,000 points waits for Airline Management review.

## Operating Context
- The CSR is on a call: the customer is identified first (UC-01), then the CSR works on that customer's profile (UC-04, UC-09).
- Notifications (flight changes, service responses, booking updates, customer activity) arrive with a delivery status of pending, sent or failed; opening one leads to the customer (UC-01 A1).
- Bookings come from a reservation system import; a malformed record is excluded with a data-quality notice (NFR-03).
- Point adjustments: reason code and note required (FR-09); permission checked; above 3,000 points needs Airline Management approval (NFR-07); balance and tier change together or not at all (NFR-09).

## Capabilities and Constraints
- Static clickable prototype in plain HTML/CSS/JS (no build step); opened from a file and screenshotted for the report.
- Field names follow the consolidated class diagram (Customer, Booking, LoyaltyAccount, PointAdjustment, ServiceRequest, Notification, StaffAccount, ReservationImportRecord). LoyaltyTier values are only Silver, Gold and Platinum.
- The team has said nothing about the current screens is fixed: screens, structure and sample data may change, as long as the three use cases and the home page stay covered.
- Screenshots must stay readable when printed in the PDF report.

## Brand Commitments
Product name "AirlineCRM". No airline brand, logo or carrier name exists; do not invent a real airline's identity or flight codes.

## Evidence on Hand
Requirements, use cases, sequence and activity diagrams and the class diagram in `../` (Requirements, Behavioral_Modeling, Object_Modeling). Scenarios S-01 to S-05 in `../Requirements/Scenarios.md`. All customer and staff data in the prototype is fictional sample data and must stay labelled as such in the report.

## Product Principles
- Identify the caller first; everything else hangs off the selected customer.
- Show the use case's steps and rules on screen (required fields, review threshold, excluded imports) rather than hiding them.
- A work tool first: polish must never slow down finding a customer or adjusting points.
- Readable at print size: the report is where most people will see it.
