# GUI Prototypes

Clickable prototype of the AirlineCRM workspace for the Customer Service Representative.
Open `index.html` in a browser (no build step; fonts load from Google Fonts when online).

| Screen | Route | Use case |
|---|---|---|
| Home ("Today") | `#home` | Main screen |
| Locate Customer | `#search` | UC-01 |
| Booking & Travel History | `#history` | UC-04 |
| Adjust Loyalty Points | `#loyalty` | UC-09 |

Design: "Timetable & Route Map": a spruce livery rail, ruled timetable rows with tabular figures, travel drawn
as routes from the Dubai hub and on an exact-scale timeline. See `DESIGN.md` for the tokens and rules.

Things to try:
- Search by name ("Kheder"), customer ID, email, phone (local "050 418 2290" works) or booking reference ("K7Q2MD").
  Click a result to expand it, click it again (or "Open profile") to open the profile.
- On Travel history, hover a booking or a route: the route lights on the map and its flights on the timeline.
- On Loyalty, type more than 3,000 points to see the Airline Management review rule; submit without a reason
  code or note to see the required-field errors (UC-09 A1).

All people and records in `data.js` are fictional sample data; field names follow the class diagram.
`Screenshots/` holds the images used in Section 9 of the final report.
