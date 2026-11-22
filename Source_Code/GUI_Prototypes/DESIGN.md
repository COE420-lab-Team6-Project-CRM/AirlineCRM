---
name: AirlineCRM
description: CSR workspace set like an airline timetable and route map, on a spruce livery rail and cool paper.
colors:
  spruce: "#0b4f43"
  spruce-deep: "#083c33"
  spruce-ink: "#0a3a31"
  spruce-tint: "#e4eeea"
  spruce-wash: "#f0f5f3"
  rail-text: "#c9ddd6"
  rail-group: "#9fc0b5"
  rail-meta: "#a9c7bd"
  rail-chip: "#cfe3dc"
  rail-avatar: "#1e6a5c"
  ground: "#f4f5f2"
  surface: "#ffffff"
  ink: "#121614"
  head-ink: "#2f3633"
  label-ink: "#3d4541"
  muted: "#545c58"
  faint: "#6a716d"
  rule: "#dde2de"
  track: "#e6e9e7"
  map-grid: "#e3e7e4"
  axis: "#cfd5d1"
  tick: "#b9c0bc"
  field-stroke: "#b7c5bf"
  chip: "#e8ebe9"
  chip-ink: "#2c3330"
  amber: "#d99a0e"
  amber-ink: "#7a5200"
  amber-tint: "#fbf1d9"
  slate-wash: "#e8edf0"
  slate-chip: "#e9ecef"
  slate-ink: "#1f2a30"
  pos-tint: "#dff3e7"
  pos-ink: "#12502f"
  neg: "#b4232a"
  neg-tint: "#fbe5e3"
  neg-ink: "#7e171c"
  tier-silver: "#9aa29e"
  tier-gold: "#8a7a3c"
  tier-platinum: "#5f7d8c"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "56px"
    fontWeight: 600
    lineHeight: "56px"
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 82"
    fontFeature: "'tnum' 1"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "40px"
    fontWeight: 650
    lineHeight: "44px"
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 82"
  headline-profile:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 650
    lineHeight: "36px"
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 82"
  figure:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: "44px"
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 82"
    fontFeature: "'tnum' 1"
  figure-small:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: "32px"
    fontVariation: "'wdth' 82"
    fontFeature: "'tnum' 1"
  title-panel:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 650
    lineHeight: "26px"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: "22px"
  body-lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "22px"
    fontFeature: "'tnum' 1"
  label-strong:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: "22px"
  column-head:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "22px"
    fontVariation: "'wdth' 75"
  caption:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "17px"
  code:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 75"
    fontFeature: "'tnum' 1"
  tag:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: "24px"
    fontVariation: "'wdth' 80"
  input-search:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 500
  input-points:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    fontVariation: "'wdth' 85"
    fontFeature: "'tnum' 1"
rounded:
  hair: "2px"
  chip: "3px"
  sm: "4px"
  panel: "6px"
  pill: "10px"
  round: "50%"
spacing:
  label: "6px"
  control-gap: "10px"
  cell: "12px"
  inset: "16px"
  panel: "24px"
  head: "28px"
  section: "36px"
  gutter: "40px"
  row: "46px"
  row-two: "58px"
components:
  button-primary:
    backgroundColor: "{colors.spruce}"
    textColor: "{colors.surface}"
    typography: "{typography.label-strong}"
    rounded: "{rounded.sm}"
    padding: "0 18px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.spruce-deep}"
    textColor: "{colors.surface}"
  button-primary-search:
    backgroundColor: "{colors.spruce}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "0 26px"
    height: "56px"
  button-primary-submit:
    backgroundColor: "{colors.spruce}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    width: "100%"
    height: "46px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label-strong}"
    rounded: "{rounded.sm}"
    padding: "0 18px"
    height: "40px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.spruce}"
    typography: "{typography.label-strong}"
    rounded: "{rounded.sm}"
    padding: "0 8px"
    height: "32px"
  button-ghost-hover:
    backgroundColor: "{colors.spruce-tint}"
    textColor: "{colors.spruce-ink}"
  input-search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.input-search}"
    rounded: "{rounded.sm}"
    padding: "0 16px 0 50px"
    height: "56px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "44px"
  input-points:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.input-points}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "52px"
  segmented:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "3px"
  segmented-option:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label-strong}"
    rounded: "{rounded.chip}"
    height: "34px"
  segmented-option-active:
    backgroundColor: "{colors.spruce}"
    textColor: "{colors.surface}"
  tag-neutral:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.chip-ink}"
    typography: "{typography.tag}"
    rounded: "{rounded.chip}"
    padding: "0 8px"
    height: "24px"
  tag-live:
    backgroundColor: "{colors.spruce-tint}"
    textColor: "{colors.spruce-ink}"
  tag-pos:
    backgroundColor: "{colors.pos-tint}"
    textColor: "{colors.pos-ink}"
  tag-neg:
    backgroundColor: "{colors.neg-tint}"
    textColor: "{colors.neg-ink}"
  tag-mid:
    backgroundColor: "{colors.slate-chip}"
    textColor: "{colors.slate-ink}"
  tag-open:
    backgroundColor: "transparent"
    textColor: "{colors.head-ink}"
  rail:
    backgroundColor: "{colors.spruce}"
    textColor: "{colors.rail-text}"
    padding: "22px 14px 18px"
    width: "232px"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.rail-text}"
    rounded: "{rounded.sm}"
    padding: "0 10px"
    height: "38px"
  nav-item-hover:
    backgroundColor: "rgba(255,255,255,0.07)"
    textColor: "{colors.surface}"
  nav-item-active:
    backgroundColor: "rgba(255,255,255,0.13)"
    textColor: "{colors.surface}"
  nav-count:
    backgroundColor: "{colors.rail-chip}"
    textColor: "{colors.spruce-deep}"
    rounded: "{rounded.pill}"
    padding: "0 6px"
    height: "20px"
  timetable-row:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    height: "{spacing.row}"
  timetable-row-hover:
    backgroundColor: "{colors.spruce-wash}"
  booking-row-hover:
    backgroundColor: "{colors.amber-tint}"
  result-row-selected:
    backgroundColor: "{colors.spruce-wash}"
  adjust-panel:
    backgroundColor: "{colors.spruce-tint}"
    rounded: "{rounded.panel}"
    padding: "22px 24px 24px"
    width: "400px"
  notice:
    backgroundColor: "{colors.slate-wash}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  notice-info:
    backgroundColor: "{colors.spruce-tint}"
    textColor: "{colors.spruce-ink}"
  notice-limit:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  notice-neg:
    backgroundColor: "{colors.neg-tint}"
    textColor: "{colors.neg-ink}"
  initials:
    backgroundColor: "{colors.spruce-tint}"
    textColor: "{colors.spruce-ink}"
    rounded: "{rounded.round}"
    size: "32px"
  initials-on-rail:
    backgroundColor: "{colors.rail-avatar}"
    textColor: "{colors.surface}"
---

# Design System: AirlineCRM

## Overview

**Creative North Star: "The Timetable & Route Map"**

AirlineCRM is set like a printed airline timetable. Every customer, booking, request and point adjustment is a row in one grid with exact columns, tabular figures and hairline rules. Travel is drawn the way a carrier's route map draws it: amber arcs bowing out from the Dubai hub. The room around the work is a spruce livery rail on the left and cool paper everywhere else. Regions are separated by colour fields, rules and type scale. There are no bordered containers.

The density is that of a work tool used on a live call. Rows are 46px tall (58px when they carry a second line), columns sit 12px apart, and the main sheet keeps a 40px margin. Quantities are drawn to scale wherever a number has a size: request age as a proportional bar, adjustments against a 3,000-point limit marker, flights placed on a dated timeline. The selected search result opens in place instead of moving to a new page.

The system refuses the boxed-card SaaS admin: white cards with borders and shadows, blue primary buttons, KPI tiles. It also has to survive print, because most readers see it as screenshots in a PDF report, so secondary text never drops below 14px and tags hold at 13px.

**Key Characteristics:**
- Spruce rail (#0b4f43) owns the left edge; cool paper (#f4f5f2) is the ground; ink (#121614) carries the type.
- Amber appears only on routes, today, the review limit and live highlights.
- One family, Archivo, with the width axis doing the work: condensed for codes and column heads, regular for reading.
- Tabular figures everywhere.
- Each section opens with a 2px ink rule, then a heading row, then 1px-ruled rows.
- Flat paper. Depth comes from colour fields, not shadows.

## Colors

A cool, nearly monochrome paper-and-ink palette with one deep green livery colour and one amber signal.

### Primary
- **Spruce Livery** (#0b4f43): the left rail field, primary buttons, the active segmented option, the hub pin and airport pin strokes on the route map, the points-scale fill below the review limit, and link text. 8.67:1 on paper.
- **Deep Spruce** (#083c33): primary button hover, and the text of the nav count chips.
- **Spruce Ink** (#0a3a31): text on spruce-tinted fields (live tags, info notices, the adjust panel's permission and fine-print lines, initials).
- **Spruce Tint** (#e4eeea): the adjust-points panel field, info notices, live tags, initials discs, ghost-button hover, the search field's focus halo.
- **Spruce Wash** (#f0f5f3): hover on clickable timetable rows, the selected search result and its expanded detail, recently-viewed hover.

### Secondary
- **Signal Amber** (#d99a0e): strokes and marks only. Route arcs, upcoming-flight dots, the Today line, the 3,000-point limit marker, the points fill once it passes the limit, the 2px keyline on the review notice and the brand mark's arc. At 2.24:1 on paper it never carries text.
- **Amber Ink** (#7a5200): the one text use of the amber family, the "Today" label on the timeline (6.32:1).
- **Amber Tint** (#fbf1d9): live highlight fields. The hovered booking row, search-term highlights, text selection.

### Tertiary
- **Status pairs**: sent, resolved and approved tags use Pos Tint (#dff3e7) with Pos Ink (#12502f); failed, cancelled, urgent, high-priority and rejected tags use Neg Tint (#fbe5e3) with Neg Ink (#7e171c). **Signal Red** (#b4232a) marks cancelled flights on the map (dashed arc) and timeline (hollow ring), invalid field strokes and error text.
- **Slate** (#e8edf0 wash, #e9ecef chip, #1f2a30 ink): the neutral data-quality notice and the Medium priority tag. Slate keeps warnings out of amber.
- **Tier dots**: Silver (#9aa29e), Gold (#8a7a3c), Platinum (#5f7d8c). Shown as an 8px dot before the tier name, never as a filled badge. Silver also fills negative adjustments on the points scale.

### Neutral
- **Cool Paper** (#f4f5f2): the page ground and the halo stroke behind map labels.
- **White Surface** (#ffffff): fields only: inputs, the search box, the quick-search bar, the segmented control, the review notice.
- **Timetable Ink** (#121614): body text, the 2px section rules, outline buttons, proportional bar fills, flown-flight dots.
- **Head Ink** (#2f3633): column heads and open-status tag text. **Label Ink** (#3d4541): fact labels in the profile header and timeline month labels.
- **Muted Grey** (#545c58): secondary text, ledes, sub-lines, meta notes (6.29:1 on paper). **Faint Grey** (#6a716d): tab counts only (4.57:1).
- **Hairline** (#dde2de): row dividers, tab baseline, figure-strip dividers. **Track** (#e6e9e7): empty bar and scale tracks. **Map Grid** (#e3e7e4), **Axis** (#cfd5d1), **Tick** (#b9c0bc): route-map graticule, timeline axis, ticks and the scale's zero mark.
- **Field Stroke** (#b7c5bf): 1px border of form inputs and the segmented control, and the rule above the balance preview.
- **Chip** (#e8ebe9) with **Chip Ink** (#2c3330): neutral tags and the searchable-field keys.
- **Rail tones**: Rail Text (#c9ddd6) for nav links, Rail Group (#9fc0b5) for the group label, Rail Meta (#a9c7bd) for the user's role line, Rail Chip (#cfe3dc) for counts, Rail Avatar (#1e6a5c) for the initials disc on the rail.

### Named Rules
**The Amber Signal Rule.** Amber marks something that is moving, current or over a limit: a route, today, the 3,000-point line, the hovered booking, the matched search text. It is never a button, never a heading, never text.

**The Colour-Field Rule.** A region is set apart by filling it (spruce rail, spruce-tint panel, spruce-wash selection, slate notice), not by drawing a border or a shadow around it. White is for fields the CSR types into.

## Typography

**Display Font:** Archivo (with Helvetica Neue, Arial, sans-serif), loaded as a variable font with width 62–125 and weight 400–700.
**Body Font:** Archivo, same file.
**Label/Mono Font:** Archivo at condensed width (wdth 75–80). There is no monospace face.

**Character:** One grotesque used the way timetable printers used a single family: condensed cuts for codes and column heads, normal width for reading, heavier and tighter for the few large figures. All numerals are tabular (`font-variant-numeric: tabular-nums` on body).

### Hierarchy
- **Display** (600, 56px/56px, wdth 82, −0.02em): the points balance only. 44px/46px on narrow screens. The trailing "pts" unit drops to 18px muted, weight 500.
- **Headline** (650, 40px/44px, wdth 82, −0.02em): the home date line. 30px/34px on narrow screens.
- **Headline Profile** (650, 32px/36px, wdth 82): screen titles on search and the customer name on profile screens.
- **Figure** (600, 40px/44px, wdth 82): the four counts in the home figures strip. **Figure Small** (600, 28px/32px, wdth 82): travel stats and the tier/member-since values beside the balance.
- **Title Panel** (650, 20px/26px): the "Adjust points" panel heading.
- **Title** (650, 16px/22px): every timetable section heading.
- **Body Lede** (400, 16px/24px, max 70ch, muted with ink bold lead-in): the one-sentence finding under a headline.
- **Body** (400, 15px/22px): table cells, notices, form text.
- **Label Strong** (600, 15px/22px): buttons, tabs, field labels, figure labels.
- **Column Head** (600, 14px, wdth 75, head ink): table column heads. Sentence case, no tracking.
- **Caption** (400, 14px/17px, muted): sub-lines under a row's primary value, section meta notes, legends, breadcrumb.
- **Code** (500, wdth 75, +0.01em): customer IDs, booking references, flight numbers, request and adjustment IDs, staff IDs.
- **Tag** (600, 13px, wdth 80): status tags. 13px is the smallest text in the system. Profile fact labels also sit at 13px (600, wdth 75, label ink).

### Named Rules
**The One Family Rule.** Everything is Archivo. Hierarchy comes from size, weight and the width axis. Don't add a second family or a monospace for codes; use the condensed width.

**The Print Floor Rule.** Secondary text is 14px, tags and fact labels 13px, and nothing goes smaller. Muted text stays at #545c58 or darker on paper.

## Layout

A two-column shell: a 232px sticky spruce rail at full viewport height, then the main column. The main column has a top bar (quick-search field up to 560px wide, shift time and initials on the right; 18px/40px padding) and a sheet with 28px top and 40px side/bottom padding.

Inside the sheet, content sits on a small set of grids. The home and profile screens split 7fr/5fr with a 40px gutter (the travel section puts the route map in the 7fr side and the routes table in the 5fr side). The loyalty screen uses 1fr plus a fixed 400px adjust panel that sticks 20px from the top. The figures strip is four equal columns separated by 1px hairlines. The search detail row expands to three equal columns plus an action column, indented 54px to align with the name text.

Vertical rhythm: 28px under a page head, 36px between sections, 12px from a section rule to its heading, 6px from heading to column heads. Rows are 46px (58px with a sub-line); cells carry 12px right padding and none on the last column.

**One breakpoint at 900px.** Below it the rail becomes a horizontal top strip with icon-only nav (counts kept, group label and user block hidden); every split grid stacks to one column with 28px gaps; the figures strip becomes 2×2; the sheet padding drops to 20px/16px/32px; the search screen hides the top bar and collapses result rows to name and tier, with a spruce-wash fill for the selected row; profile tabs scroll sideways; any table wider than its column shows a "Swipe sideways for more columns" cue. Route-map labels redraw at 23px (in map units) so they hold 12px or more at phone width.

### Named Rules
**The Timetable Rule.** Every list is a timetable section: 2px ink rule on top, a heading row with the meta note right-aligned on the baseline, condensed column heads, then rows divided by 1px hairlines. Numbers align right.

**The To-Scale Rule.** If a quantity has a size, draw it to scale against the true reference: age bars against the oldest request, adjustments against a 0–5,000 scale with the limit at 60%, flights on a date axis. Say so in the section meta ("bar = days open, to scale").

## Elevation & Depth

The system is flat. There are no drop shadows and no lifted surfaces. Depth comes from tonal fields: the spruce rail, the spruce-tint adjust panel, the spruce-wash selected row, and white input fields on paper. Where `box-shadow` appears it has zero offset and zero blur and acts as a ring.

### Shadow Vocabulary
- **Search focus halo** (`box-shadow: 0 0 0 4px #e4eeea`): the large search input on focus, together with a spruce border.
- **Field focus halo** (`box-shadow: 0 0 0 3px rgba(11,79,67,.18)`): inputs, selects and textareas on focus.
- **Keyline rings** (`inset 0 0 0 1px #9aa6ad` on the Medium tag; `inset 0 0 0 1px #6a716d` on the Open/Pending tag; `inset 0 0 0 2px #d99a0e` on the review-limit notice): mark a tag or notice without adding a box border.

### Named Rules
**The Flat Paper Rule.** Surfaces never cast shadows. A ring is allowed only at zero offset, to show focus or to outline a tag or notice.

## Shapes

Small, quiet corners. Controls, notices and nav items use 4px. Tags, keys, keyboard hints and segmented options use 3px. The adjust panel is the one 6px field. Nav count chips are 10px pills, and initials discs and tier dots are full circles. Bars and scale tracks round their ends (3px and 2px). Nothing else is rounded.

Hard edges carry the structure: the 2px ink rule over each section, 1px hairlines between rows, the 3px ink underline under the active tab. On the route map, arcs are quadratic curves bowed to one side of the straight line (control point offset 16% of the leg length). Arc weight grows with trips flown (1.5px + 1.4px per trip), and cancelled-only legs are a dashed red line. The hub is a filled 6px spruce disc; other airports are hollow 4px rings.

## Components

### Buttons
Plain and firm. Ink outlines and one spruce fill, no gradients, no icons unless they name the action.
- **Shape:** gently squared (4px).
- **Primary:** Spruce fill, white 15px semibold text, 40px tall, 18px side padding. The search button grows to 56px tall with 26px padding and 16px text; the adjust panel's submit button spans the full width at 46px.
- **Outline (default):** transparent with a 1px ink border and ink text. Used for secondary actions (Log service request, Edit profile).
- **Hover / Active:** primary darkens to Deep Spruce; outline fills with ink and turns its text white; every button presses down 1px on `:active`. Transitions run 0.15s on background and colour.
- **Ghost:** spruce text, no border, 32px tall, 8px padding. Used for "View all", "Search" and "Not this customer". Hover fills with Spruce Tint.
- **Text link:** spruce semibold, underlined on hover with a 3px offset.

### Chips (status tags)
- **Style:** 24px tall, 8px padding, 3px corners, 13px semibold at width 80. Fill and text come in tinted pairs: neutral chip, live (spruce tint, for in-progress and confirmed), positive (pos tint), negative (neg tint), Medium (slate chip with a 1px slate keyline), Open/Pending (transparent with a 1px faint keyline).
- **State:** tags are read-only status. They never act as buttons or filters.
- **Tier marker:** the tier name in semibold at width 80, after an 8px dot in the tier colour.

### Cards / Containers
There are no cards. Containers are:
- **Timetable section:** no background, a 2px ink top rule, 12px top padding. See The Timetable Rule.
- **Figures strip:** 2px ink rule on top and a 1px hairline below. Four cells, each split from the next by a 1px hairline, with 14px/20px padding.
- **Adjust panel:** Spruce Tint field, 6px corners, 22px/24px/24px padding, sticky. No border, no shadow.
- **Notice:** a filled 12px/16px strip with 4px corners and a 16px icon. Slate for data-quality notices, Spruce Tint for info and confirmations, white with a 2px amber keyline when the 3,000-point review applies, Neg Tint with Neg Ink for refused, denied or rolled-back outcomes (wrong sign-in, missing fields, no permission, failed save).
- **Empty state:** a 1px hairline under the section heading, a 16px/650 line saying what is missing ("No bookings to show") and one muted sentence saying why or what happens next. No illustrations.

### Inputs / Fields
- **Style:** white field, 1px Field Stroke border, 4px corners, 44px tall, 12px padding. The points input is 52px with a 22px semibold figure at width 85. Textareas start at 84px and grow with their content.
- **Search field:** 56px tall, 2px ink border, 20px weight-500 text (17px on narrow screens), with the search icon set 17px from the left edge.
- **Focus:** the border turns spruce and the field gains a halo (see Elevation). Other focusable elements show a 2px spruce outline at 2px offset (white on the spruce rail), which clears 3:1 on both grounds.
- **Error:** the border turns Signal Red and a 13px red message appears below ("A reason code is required.").
- **Segmented control:** a white track with a 1px Field Stroke border and 3px padding, holding two 34px options. The checked option fills with spruce and white text.

### Navigation
- **Rail:** spruce field, 22px/14px/18px padding. The brand mark (an amber arc between a white and an amber node) sits beside "AirlineCRM" in 18px bold at width 88. Nav links are 38px tall with a 16px stroke icon and 12px gap, in Rail Text weight 500. Hover tints with white at 7%, active at 13% with white text. Counts are Rail Chip pills on the right. The user block sits at the bottom above a 12% white hairline.
- **Profile tabs:** 15px semibold muted labels 30px apart over a 1px hairline. Each tab shows its item count in faint condensed text (tabs show their extent). The active tab turns ink and gets a 3px ink underline.
- **Quick search:** a white 40px bar with a 1px hairline border, the placeholder sentence and a `/` key hint. It is hidden on the search screen itself.
- **Mobile:** rail becomes a horizontal icon strip; tabs scroll sideways with the active tab scrolled into view.

### Route Map and Timeline (signature)
The travel view pairs an equirectangular route map with a dated timeline from Dec 2025 to Dec 2026. Timeline dots are ink for flown, amber for upcoming and hollow red for cancelled, with an amber Today line labelled in Amber Ink. Hovering a booking row (or a route row) tints it Amber Tint, fades every other arc to 18% and every other timeline mark to 20%, and thickens the matching arc to 3.5px. State changes fade over 0.15s.

### Proportional Scale (signature)
A 4px Track line with an ink or spruce fill and a 2px × 18px amber limit marker at the true 3,000-point position. In the adjust panel it sits under the points input with 0, "3,000 review limit" and 5,000 ticks in 12px condensed muted text, and fills as the CSR types (0.2s transform). The fill is spruce up to the limit and amber past it, and the review notice changes with it. Request age uses the 6px bar variant with an ink fill.

### Expanding Search Result (signature)
Clicking a result selects it: the row fills Spruce Wash, its top rule turns spruce, the other results drop to 50% opacity over 0.2s, and a detail row opens underneath with contact, identity-check and record columns plus the Open profile / Not this customer actions. Clicking the selected row again opens the profile.

### Sign-in Screen
The shell (rail and top bar) is hidden until a staff member signs in. The screen splits 5fr/7fr: on the left a spruce field with the brand mark, a white headline, one muted sentence, and the brand's route map drawn in rail tones (amber arcs from a white DXB hub, airport codes in Rail Group); on the right, on paper, a 400px form with "Sign in" at headline-profile size, a muted lede, two 44px fields, a full-width 46px spruce button and a muted fine-print line. Errors use the field-error pattern for empty fields and a Neg notice for refused credentials or a deactivated account. Below 900px the spruce field shrinks to a strip with the mark only.

### Review Queue (Airline Management)
Uses the Expanding Search Result pattern: pending adjustments are timetable rows, oldest first, with the points drawn on the 0–5,000 scale (amber fill, past the limit by definition). The selected row opens in place with the CSR's note, the effect of approving (balance and tier before → after), a reason field that is required only to reject, and Approve (primary) / Reject (outline) actions. Decided adjustments follow in a plain timetable section.

### Controls Outside the Prototype
Navigation items, tabs and buttons that belong to use cases the prototype doesn't cover stay in place so the product reads as complete, but are dimmed (45–50% opacity, a not-allowed cursor, no hover change), marked `aria-disabled`, and carry a tooltip naming the use case ("Outside this prototype: UC-05 Manage Service Request"). Tab counts stay visible.

### Motion
Each view enters with a 0.22s rise (opacity 0.4 to 1, 6px upward, `cubic-bezier(.2,.8,.2,1)`). Hover and state colours change over 0.15s. Under `prefers-reduced-motion: reduce` all transitions and animations are turned off.

## Do's and Don'ts

### Do:
- **Do** set every list as a timetable section: 2px ink (#121614) rule, 16px/650 heading with a right-aligned 14px meta note, 14px condensed column heads, 46px rows on 1px #dde2de hairlines.
- **Do** use Archivo for everything, with the condensed width (wdth 75) for IDs, references, flight numbers and column heads, and tabular figures throughout.
- **Do** draw quantities to scale against their real reference, and state the scale in the section meta.
- **Do** keep amber (#d99a0e) for routes, today, the 3,000-point limit and live highlights, and use Amber Ink (#7a5200) when an amber-family label must be read as text.
- **Do** separate regions with colour fields (spruce rail, #e4eeea panel, #f0f5f3 selection) and rules.
- **Do** expand the selected item in place rather than navigating away to preview it.
- **Do** keep secondary text at 14px and tags at 13px, muted no lighter than #545c58, so screens hold up in print.
- **Do** show the count on every profile tab that holds records, and name the exact record in a data-quality notice (booking reference, import ID).

### Don't:
- **Don't** wrap content in white bordered or shadowed cards, or build KPI tiles; counts go in the ruled figures strip.
- **Don't** add drop shadows or lifted surfaces. `box-shadow` is only a zero-offset focus halo or keyline ring.
- **Don't** use blue primary buttons; the one filled button colour is spruce (#0b4f43).
- **Don't** set text, headings or buttons in amber (#d99a0e); it measures 2.24:1 on paper.
- **Don't** use amber for warnings that are not about the review limit; data-quality notices are slate (#e8edf0 / #1f2a30).
- **Don't** add a second typeface or a monospace for codes.
- **Don't** invent an airline brand, logo, livery name or real carrier codes; the product is "AirlineCRM" only and the brand mark is the abstract route arc.
