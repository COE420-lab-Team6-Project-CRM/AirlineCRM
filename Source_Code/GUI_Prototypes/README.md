# GUI Prototypes

Clickable prototype of the AirlineCRM staff workspace: the Customer Service Representative's screens for the three
major use cases, plus the Airline Management review that UC-09 needs above 3,000 points.
Open `index.html` in a browser (no build step; fonts load from Google Fonts when online).

| Screen | Route | Use case |
|---|---|---|
| Sign in | `#login` | Precondition of every use case: authenticated staff, active session (NFR-02) |
| Home ("Today") | `#home` | CSR main screen |
| Locate Customer | `#search` | UC-01 (A1 notification link, A2 no match) |
| Customer profile overview | `#overview?c=<customerId>` | UC-03, the consolidated view UC-04 extends |
| Booking & Travel History | `#history?c=<customerId>` | UC-04 (A2 excluded import, A3 no bookings) |
| Adjust Loyalty Points | `#loyalty?c=<customerId>` | UC-09 (A1–A4) |
| Point reviews | `#reviews` | UC-09 A3, Airline Management side |

Customer screens without `?c=` open Layla Kheder (CUS-004182), the customer used in the report screenshots.

## Sample accounts

The sample staff accounts share the password `Spruce-2026`, except `admin`, whose password is `P@ssw0rd`. Sign in with the staff ID or the work email.

| Staff ID | Name | Role | Shows |
|---|---|---|---|
| `STF-0142` | Mariam Al Nuaimi | CSR with point-adjustment permission | The main CSR flow |
| `STF-0175` | Yousef Darwish | CSR without point-adjustment permission | UC-09 A2: adjustment refused and audited |
| `STF-0021` | Khalid Al Shamsi | Airline Management | UC-09 A3: approve or reject adjustments above 3,000 points |
| `STF-0099` | Huda Saeed | Deactivated CSR | Sign-in refused for a deactivated account (FR-13) |
| `admin` | CRM Administrator | CRM administrator with every permission | Everything: the CSR screens with point adjustment, plus the Point reviews queue to approve or reject adjustments above 3,000 points |

`data.js` stores only a hash of each password, standing in for the server's one-way hash (NFR-12).

## Things to try

- **Sign in.** Submit empty fields, a wrong password, or the deactivated account to see each refusal. Open any
  customer URL while signed out: you are asked to sign in and then taken to that page. "Sign out" is in the top bar.
- **UC-01.** Search by name ("Kheder"), customer ID, email, phone (local "050 418 2290" works) or booking reference
  ("K7Q2MD"). Click a result to expand it, click it again (or "Open profile") to open that customer's profile.
  On Home, click a notification: the search runs on the customer ID the notification carries (A1).
- **UC-03 / UC-04.** Every customer has their own profile, travel history, route map and loyalty account. Hover a
  booking or route on Travel history to light it on the map and timeline. Layla Kheder has one excluded import (A2);
  search "Noura" for a customer with no bookings (A3); Priya Raman's map widens to reach Chennai.
- **UC-09.** As Mariam, submit Layla's prefilled 2,000 points to apply them and recalculate the tier. Type more than
  3,000 to send an adjustment for review. Submit without a reason code or note for the A1 refusal. Add
  `&simulate=failure` to a loyalty URL (for example `#loyalty?c=CUS-000958&simulate=failure`) for the A4 rollback.
  Deduct 3,000 points from Daniel Okafor to see the tier drop from Gold to Silver.
- **Review (A3).** After sending an adjustment for review, sign out and sign in as Khalid Al Shamsi. Approve it (the
  balance and tier change together) or reject it (a reason is required). Back as Mariam, Home shows the outcome.

Controls outside these use cases (service requests, notifications inbox, feedback, settings, edit profile,
dashboards) are shown dimmed and do nothing; hover one to see which use case it belongs to. Changes live in memory
only: reloading the page restores the sample data (the sign-in survives a reload in the same tab).

Tier rule used by the prototype: Silver below 25,000 points, Gold from 25,000, Platinum from 60,000.

All people and records in `data.js` are fictional sample data; field names follow the class diagram.
`Screenshots/` holds the images used in Section 9 of the final report.
