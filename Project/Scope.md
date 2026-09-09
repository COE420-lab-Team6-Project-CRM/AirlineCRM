# Project Scope — AirlineCRM

## 1. Project Objective

AirlineCRM is a centralised system that consolidates an airline's relationships with
individual customers, corporate clients and external partner businesses into one platform.

**Problem addressed.** Airline customer data is normally fragmented across separate systems
for reservations, complaints, loyalty and marketing, and B2B relationships with corporate
clients and vendors (catering, maintenance) are often tracked informally outside any system.
An agent therefore cannot see that a caller complained last week, holds a high loyalty tier
and flies tomorrow; and account managers have no consistent record of enterprise agreements
or partner engagement. The result is repeated requests for the same information, inconsistent
service, slow complaint resolution, untargeted marketing, and poor visibility of B2B
relationship health.

**Solution.** A unified profile for every customer, corporate client and partner, with
structured service-request handling, loyalty and feedback tracking, segmentation-driven
communication, and management dashboards focused on improving customer satisfaction, streamlining
service operations, strengthening loyalty and B2B relationships, and supporting informed
management decisions.

## 2. Target Users

| User | Needs from the system |
|---|---|
| **Customer service representative** | Fast customer lookup; full interaction history; create, update and resolve service requests and complaints |
| **Account manager (corporate/enterprise)** | Manage B2B client accounts and agreements; track partner and vendor interactions |
| **Marketing staff** | Segment customers; send personalised promotions, notifications and travel updates; track campaigns |
| **Manager** | Dashboards and reports on satisfaction, bookings, complaints, loyalty and partner engagement |
| **CRM administrator** | User accounts, roles and permissions; system configuration |

**Indirect beneficiaries:** passengers, corporate clients and partner businesses, who are
recorded in the system but are not system users. They benefit through faster, more consistent
handling of their requests.

## 3. In-Scope Features

1. **Customer management** — create and maintain customer profiles and contact details; consolidated view combining profile, bookings, requests, loyalty and feedback; search by name, ID, email, phone or booking reference.
2. **Booking & travel history** — reservations, flights, cancellations and travel history displayed per customer (read-only in the CRM).
3. **Customer service management** — log inquiries, requests and complaints; categories and priorities; assignment to staff; status workflow from open to closed; resolution notes and audit trail.
4. **Feedback & satisfaction** — record customer feedback, rate and monitor satisfaction, view satisfaction trends.
5. **Loyalty programme management** — loyalty points balance, membership levels, rewards, tier history, authorised manual point adjustment.
6. **B2B & partner management** — corporate/enterprise client accounts and agreements; partner and vendor records (e.g. catering, maintenance); interaction and engagement tracking per account.
7. **Marketing & communication** — customer segmentation by loyalty tier, route, travel frequency and complaint history; saved segments; personalised promotions and travel-related communications; campaign tracking.
8. **Employee/user management** — authentication and role-based access across the five roles above; restriction of sensitive actions; audit logging.
9. **Reports & dashboards** — customer, partner and operational analytics: request volume and resolution time, complaint categories, loyalty distribution, campaign results, partner engagement; report export.
10. **Notification management** — booking updates, flight notifications and service responses created and tracked within the system.

## 4. Out-of-Scope Features

| Excluded | Reason |
|---|---|
| Flight booking/reservation engine | CRM manages relationships, not inventory; booking data consumed read-only |
| Live GDS or reservation-system integration | Requires commercial access unavailable to the team; data populated by simulated import |
| Payment processing, refunds, invoicing | Needs gateway integration and PCI-DSS compliance not achievable in the timeframe |
| Check-in, seat inventory, baggage handling | Airport operations, outside the CRM domain |
| Passenger- or client-facing portal or mobile app | System is staff-facing only |
| Actual email/SMS despatch | Communications are composed and tracked in the CRM; despatch is assumed to be handled by an external platform, and integration with it is excluded |
| Live chat and social media channels | Third-party APIs and real-time infrastructure beyond scope |
| AI features (chatbot, sentiment analysis, churn prediction) | Requires training data and modelling effort disproportionate to the project |
| Supply-chain, procurement or contract execution with partners | Only the *relationship* is tracked, not ordering or fulfilment |
| Multi-airline/multi-tenant support | Designed for a single airline |
| Multi-language UI | English only; customer language preference stored as data |
| Production deployment, scaling, disaster recovery | Deliverable is a demonstrable system, not a production-hardened one |

This list is binding. Additions require a recorded team decision.

## 5. Major Deliverables

**Software** — D1 core customer profiles, users and access control (Inc. 1); D2 booking history, service requests and notifications (Inc. 2); D3 loyalty and feedback (Inc. 3); D4 B2B and partner management (Inc. 4); D5 segmentation, marketing and dashboards (Inc. 5); D6 integrated AirlineCRM system.

**Prototypes** — P1 management dashboard; P2 marketing/campaign builder. Both throwaway.

**Documentation** — project proposal; process model, project scope, risk register, stakeholder analysis and feasibility study; requirements specification; design document with data model and architecture; test plan and results; user guide; final report and demonstration.

**Project artefacts** — GitHub repository with per-member contribution history; a tagged release per increment; retrospective notes; prototype review records.
