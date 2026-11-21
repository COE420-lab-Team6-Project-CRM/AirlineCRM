// AirlineCRM prototype v2 — "Timetable & Route Map". Four screens rendered from data.js:
//   #home     CSR home ("Today")
//   #search   UC-01 Locate Customer
//   #history  UC-04 View Booking & Travel History
//   #loyalty  UC-09 Adjust Loyalty Points
const D = DATA;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const fmt = (n) => n.toLocaleString("en-US");
const signed = (n) => (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n));
const cust = (id) => D.customers.find((c) => c.customerId === id);
const nice = (e) => e.charAt(0) + e.slice(1).toLowerCase().replace(/_/g, " ");
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const days = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const ICON = {
  home: '<path d="M2.5 7.2 8 2.8l5.5 4.4V13.5H9.8V10H6.2v3.5H2.5Z"/>',
  users: '<circle cx="6" cy="5.5" r="2.5"/><path d="M1.8 13.5c.4-2.3 2.1-3.6 4.2-3.6s3.8 1.3 4.2 3.6M10.6 3.3a2.5 2.5 0 0 1 0 4.4M12 9.9c1.2.5 2 1.6 2.2 3.6"/>',
  inbox: '<path d="M2 9.5 3.8 3h8.4L14 9.5V13H2Z"/><path d="M2 9.5h3.5l.8 1.5h3.4l.8-1.5H14"/>',
  bell: '<path d="M4 11V7a4 4 0 0 1 8 0v4l1.2 1.5H2.8Z"/><path d="M6.5 14h3"/>',
  chat: '<path d="M2.5 3h11v7.5H7l-3 2.5v-2.5H2.5Z"/>',
  gear: '<circle cx="8" cy="8" r="2"/><path d="M8 1.8v1.6M8 12.6v1.6M3.6 3.6l1.1 1.1M11.3 11.3l1.1 1.1M1.8 8h1.6M12.6 8h1.6M3.6 12.4l1.1-1.1M11.3 4.7l1.1-1.1"/>',
  search: '<circle cx="7" cy="7" r="4.6"/><path d="m10.5 10.5 3.5 3.5"/>',
  alert: '<path d="M8 2 14.5 13.5h-13Z"/><path d="M8 6.5v3.2"/><circle cx="8" cy="11.6" r=".5" fill="currentColor"/>',
  info: '<circle cx="8" cy="8" r="6.25"/><path d="M8 7.2v4"/><circle cx="8" cy="5" r=".5" fill="currentColor"/>',
  check: '<path d="m3 8.5 3 3 7-7"/>',
  arrow: '<path d="M3 8h10M9 4l4 4-4 4"/>',
};
const icon = (n, s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;
const TIER_C = { Silver: "#9aa29e", Gold: "#8a7a3c", Platinum: "#5f7d8c" };
const tier = (t) => `<span class="tier" style="--tc:${TIER_C[t]}">${t}</span>`;
const initials = (c, cls = "") => `<span class="initials ${cls}">${c.fullName.split(" ").map((w) => w[0]).filter((x) => /[A-Z]/.test(x)).slice(0, 2).join("")}</span>`;
const PRI = { URGENT: "neg", HIGH: "neg", MEDIUM: "mid", LOW: "" };
const REQ = { OPEN: "", IN_PROGRESS: "live", RESOLVED: "pos", CLOSED: "" };
const ADJ = { PENDING: ["open", "Pending review"], APPROVED: ["pos", "Approved"], REJECTED: ["neg", "Rejected"] };
const BOOK = { CONFIRMED: "live", FLOWN: "", CANCELLED: "neg" };
const NTF = { PENDING: "", SENT: "pos", FAILED: "neg" };

// ---------------------------------------------------------------- shell
function renderNav(route) {
  const items = [["home", "Home", "#home", ""], ["users", "Customers", "#search", ""], ["inbox", "Service requests", "#home", D.requests.length],
    ["bell", "Notifications", "#home", D.notifications.length], ["chat", "Feedback", "#home", ""]];
  const active = route === "home" ? "Home" : "Customers";
  $("#nav").innerHTML = items.map(([i, l, h, c]) => `<a href="${h}" class="${l === active ? "active" : ""}" ${l === active ? 'aria-current="page"' : ""}>${icon(i)}<span>${l}</span>${c !== "" ? `<span class="count" aria-label="${c} need action">${c}</span>` : ""}</a>`).join("")
    + `<div class="group">Account</div><a href="#home">${icon("gear")}<span>Settings</span></a>`;
}

// ---------------------------------------------------------------- home
function viewHome() {
  const t = new Date(D.today);
  const failed = D.notifications.filter((n) => n.status === "FAILED");
  const fc = cust(failed[0].customerId);
  const open = D.requests.filter((r) => r.status === "OPEN").length;
  const pending = D.myAdjustments.filter((a) => a.status === "PENDING");
  const reqs = [...D.requests].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const maxAge = Math.max(...reqs.map((r) => days(r.createdAt, D.today)));
  const maxPts = 5000;
  return `
  <div class="head">
    <div><h1>${DAYS[t.getDay()]} ${t.getDate()} ${MONTHS[t.getMonth()]}</h1>
      <p class="lede"><b>A flight-change notice to ${fc.fullName} failed after ${failed[0].retryCount} retries.</b> Call the customer about the retimed flight before working the queue.</p></div>
    <div class="actions"><button class="btn">Log service request</button><a class="btn primary" href="#search">${icon("search")}Find customer</a></div>
  </div>

  <section class="figures" aria-label="Your queue">
    <div class="fig"><div class="n">${D.requests.length}</div><div class="l">Open requests</div><div class="s">${open} open, ${D.requests.length - open} in progress</div></div>
    <div class="fig"><div class="n">${D.notifications.length}</div><div class="l">Notifications to follow up</div><div class="s">${failed.length} failed delivery</div></div>
    <div class="fig"><div class="n">${pending.length}</div><div class="l">Adjustment awaiting review</div><div class="s">${fmt(pending[0].points)} pts with Airline Management</div></div>
    <div class="fig"><div class="n">${D.closedToday}</div><div class="l">Requests closed today</div><div class="s">Since the shift started</div></div>
  </section>

  <div class="cols">
    <section class="tt">
      <div class="tt-head"><h2>Notifications</h2><a class="btn ghost" href="#home">View all</a></div>
      <div class="wrap-x"><table class="rows"><thead><tr><th>Notification</th><th>What happened</th><th>Customer</th><th class="r">Delivery</th></tr></thead><tbody>
      ${D.notifications.map((n) => { const c = cust(n.customerId); return `<tr class="go" data-go="#history">
        <td class="two"><span class="semi">${nice(n.type)}</span><span class="sub code">${n.notificationId}</span></td>
        <td>${n.body}</td><td><a class="link" href="#history">${c.fullName}</a></td>
        <td class="r"><span class="tag ${NTF[n.status]}">${nice(n.status)}</span></td></tr>`; }).join("")}
      </tbody></table></div>
    </section>
    <section class="tt">
      <div class="tt-head"><h2>Recently viewed</h2><a class="btn ghost" href="#search">Search</a></div>
      <div class="wrap-x"><table class="rows"><thead><tr><th>Customer</th><th>Tier</th><th class="r">Customer ID</th></tr></thead><tbody>
      ${D.recent.map((id) => { const c = cust(id); return `<tr class="go" data-go="#history"><td class="two"><span style="display:flex;align-items:center;gap:12px">${initials(c)}<span><span class="semi">${c.fullName}</span><span class="sub">Updated ${c.lastUpdated}</span></span></span></td>
        <td>${tier(c.tier)}</td><td class="r code">${c.customerId}</td></tr>`; }).join("")}
      </tbody></table></div>
    </section>
  </div>

  <div class="cols">
    <section class="tt">
      <div class="tt-head"><h2>Your open service requests</h2><span class="meta">Oldest first · bar = days open, to scale</span></div>
      <div class="wrap-x"><table class="rows"><thead><tr><th>Request</th><th>Customer</th><th>Category</th><th>Priority</th><th>Status</th><th style="width:22%">Age</th><th class="r">Days</th></tr></thead><tbody>
      ${reqs.map((r) => { const a = days(r.createdAt, D.today); return `<tr>
        <td class="code">${r.requestId}</td><td>${cust(r.customerId).fullName}</td><td>${nice(r.category)}</td>
        <td><span class="tag ${PRI[r.priority]}">${nice(r.priority)}</span></td><td><span class="tag ${REQ[r.status]}">${nice(r.status)}</span></td>
        <td><div class="bar" aria-hidden="true"><i style="width:${Math.max(2, (a / maxAge) * 100)}%"></i></div></td><td class="r semi">${a}</td></tr>`; }).join("")}
      </tbody></table></div>
    </section>
    <section class="tt">
      <div class="tt-head"><h2>Your point adjustments</h2><span class="meta">Amber line = 3,000-point review limit</span></div>
      <div class="wrap-x"><table class="rows"><thead><tr><th>Customer</th><th>Points</th><th class="r">Status</th></tr></thead><tbody>
      ${D.myAdjustments.map((a) => { const w = (Math.abs(a.points) / maxPts) * 100; return `<tr>
        <td class="two"><span class="semi">${cust(a.customerId).fullName}</span><span class="sub code">${a.adjustmentId}</span></td>
        <td><div style="display:grid;grid-template-columns:60px 96px;align-items:center;gap:10px"><span class="semi" style="text-align:right">${signed(a.points)}</span>
          <div class="scale" aria-hidden="true"><div class="track"></div><div class="fill" style="left:0;width:${w}%;background:${a.points < 0 ? "#9aa29e" : "var(--ink)"}"></div><div class="limit" style="left:${(D.seniorThreshold / maxPts) * 100}%"></div></div></div></td>
        <td class="r"><span class="tag ${ADJ[a.status][0]}">${ADJ[a.status][1]}</span></td></tr>`; }).join("")}
      </tbody></table></div>
    </section>
  </div>`;
}

// ---------------------------------------------------------------- UC-01
const FIELDS = [["fullName", "Name"], ["customerId", "Customer ID"], ["email", "Email"], ["phoneNumber", "Phone"]];
function search(term) {
  const t = term.trim().toLowerCase(); if (!t) return [];
  const digits = t.replace(/\D/g, "").replace(/^0+/, "");   // local format 050… matches +971 50…
  return D.customers.flatMap((c) => {
    for (const [k, label] of FIELDS) {
      const v = c[k].toLowerCase();
      if (v.includes(t) || (k === "phoneNumber" && digits.length >= 4 && v.replace(/\D/g, "").includes(digits))) return [{ c, on: label, key: k }];
    }
    const ref = (D.bookingRefs[c.customerId] || []).find((r) => r.toLowerCase() === t);
    return ref ? [{ c, on: "Booking reference", key: "ref", ref }] : [];
  });
}
const hl = (text, q) => { const i = text.toLowerCase().indexOf(q.toLowerCase()); return i < 0 || !q ? esc(text) : esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length)); };
let S = { q: "Kheder", sel: "CUS-004182" };
function viewSearch() {
  const res = search(S.q);
  if (S.sel === undefined || (S.sel && !res.some((r) => r.c.customerId === S.sel))) S.sel = res[0] ? res[0].c.customerId : null;
  const row = ({ c, on, key }) => {
    const sel = c.customerId === S.sel;
    const refs = (D.bookingRefs[c.customerId] || []).slice(0, 2);
    const reqs = D.requests.filter((r) => r.customerId === c.customerId);
    return `<tr class="res go ${sel ? "sel" : ""}" data-sel="${c.customerId}" aria-expanded="${sel}">
      <td class="two"><span style="display:flex;align-items:center;gap:12px">${initials(c)}<span><span class="semi">${key === "fullName" ? hl(c.fullName, S.q) : esc(c.fullName)}</span><span class="sub">${key === "email" ? hl(c.email, S.q) : esc(c.email)}</span></span></span></td>
      <td class="code">${key === "customerId" ? hl(c.customerId, S.q) : c.customerId}</td><td>${c.phoneNumber}</td><td>${tier(c.tier)}</td>
      <td><span class="tag">${on}</span></td><td class="r">${c.lastFlight}</td></tr>
    ${sel ? `<tr class="detail"><td colspan="6"><div class="detail-grid">
      <div><h3>Contact</h3><dl class="kv"><dt>Phone</dt><dd>${c.phoneNumber}</dd><dt>Address</dt><dd>${c.mailingAddress}</dd><dt>Language</dt><dd>${c.preferredLanguage}</dd></dl></div>
      <div><h3>Check identity before sharing details</h3><dl class="kv"><dt>Date of birth</dt><dd>${c.dateOfBirth}</dd><dt>Recent bookings</dt><dd class="code">${refs.join(" · ") || "—"}</dd></dl></div>
      <div><h3>Record</h3><dl class="kv"><dt>Customer since</dt><dd>${c.createdAt}</dd><dt>Last updated</dt><dd>${c.lastUpdated}</dd><dt>Open requests</dt><dd>${reqs.length ? reqs.map((r) => `<span class="code">${r.requestId}</span> ${nice(r.category)}`).join(", ") : "0"}</dd></dl></div>
      <div class="act"><a class="btn primary" href="#history">Open profile ${icon("arrow")}</a><button class="btn ghost" data-clear>Not this customer</button></div>
    </div></td></tr>` : ""}`;
  };
  return `
  <div class="head"><div><h1 class="small">Locate customer</h1><p class="lede">Ask the caller for any one identifier. Every matching profile is listed with the field it matched.</p></div></div>
  <form class="searchbox" id="sf" role="search"><div class="field">${icon("search", 20)}<input id="q" value="${esc(S.q)}" aria-label="Search term" autocomplete="off"></div><button class="btn primary">Search</button></form>
  <div class="keys">Searches <span>Name</span><span>Customer ID</span><span>Email</span><span>Phone</span><span>Booking reference</span></div>
  ${res.length ? `
  <section class="tt">
    <div class="tt-head"><h2>${res.length} ${res.length > 1 ? "customers match" : "customer matches"} “${esc(S.q)}”</h2><span class="meta">Select the caller to open their profile</span></div>
    <div class="wrap-x"><table class="rows results ${S.sel ? "has-sel" : ""}"><thead><tr><th style="width:32%">Customer</th><th>Customer ID</th><th>Phone</th><th>Tier</th><th>Matched on</th><th class="r">Last flight</th></tr></thead>
    <tbody>${res.map(row).join("")}</tbody></table></div>
  </section>
  <section class="tt" style="margin-top:36px"><div class="tt-head"><h2>Recently viewed</h2><span class="meta">Open a profile without searching</span></div>
    <div class="recent">${D.recent.map((id) => { const c = cust(id); return `<a href="#history">${initials(c)}<span><span class="semi">${c.fullName}</span><span class="sub"><span class="code">${c.customerId}</span> · ${c.tier}</span></span></a>`; }).join("")}</div></section>` : `
  <section class="tt"><div style="padding:28px 0"><h2>No customer matches “${esc(S.q)}”</h2><p class="muted" style="margin:6px 0 0">Check the spelling, or ask for their email, phone number or a booking reference.</p></div></section>`}`;
}

// ---------------------------------------------------------------- profile header
const L = cust("CUS-004182");
function profile(tab) {
  const reqs = D.requests.filter((r) => r.customerId === L.customerId).length;
  const tabs = [["Overview", "#history", ""], ["Travel history", "#history", D.bookings.length, "history"], ["Service requests", "#history", reqs],
    ["Loyalty", "#loyalty", D.loyalty.adjustments.length, "loyalty"], ["Feedback", "#history", 2]];
  return `
  <div class="crumb"><a href="#search">Customers</a> / ${L.customerId}</div>
  <div class="head" style="margin-bottom:0">
    <div class="who">${initials(L)}<div><h1 class="small">${L.fullName}</h1></div>${tier(L.tier)}</div>
    <div class="actions"><button class="btn">Edit profile</button><button class="btn">Log service request</button></div>
  </div>
  <dl class="facts">
    <div><dt>Customer ID</dt><dd class="code">${L.customerId}</dd></div><div><dt>Email</dt><dd>${L.email}</dd></div>
    <div><dt>Phone</dt><dd>${L.phoneNumber}</dd></div><div><dt>Date of birth</dt><dd>${L.dateOfBirth}</dd></div>
    <div><dt>Language</dt><dd>${L.preferredLanguage}</dd></div><div><dt>Customer since</dt><dd>${L.createdAt}</dd></div>
    <div><dt>Address</dt><dd>${L.mailingAddress}</dd></div>
  </dl>
  <nav class="tabs" aria-label="Customer profile">${tabs.map(([l, h, c, id]) => `<a href="${h}" class="${id === tab ? "active" : ""}" ${id === tab ? 'aria-current="page"' : ""}>${l}${c !== "" ? `<span class="c">${c}</span>` : ""}</a>`).join("")}</nav>`;
}

// ---------------------------------------------------------------- UC-04
const LBL = { DXB: [-12, 20, "end"], MCT: [10, 5, "start"], LHR: [10, -8, "start"], IST: [10, -8, "start"], BEY: [-10, -6, "end"], AMM: [-4, 26, "start"], CAI: [-10, -6, "end"] };
function routeMap() {
  const narrowMap = window.matchMedia("(max-width: 900px)").matches;   // labels stay >= 12px when the map is drawn at phone width
  // equirectangular projection over the region the customer flies in
  const W = 560, H = 250, lon0 = -6, lon1 = 70, lat0 = 21, lat1 = 54;
  const P = (code) => { const [lo, la] = D.airports[code]; return [((lo - lon0) / (lon1 - lon0)) * W, H - ((la - lat0) / (lat1 - lat0)) * H]; };
  let grid = "";
  for (let lo = 0; lo <= 60; lo += 10) { const x = ((lo - lon0) / (lon1 - lon0)) * W; grid += `<line x1="${x}" x2="${x}" y1="0" y2="${H}" stroke="#e3e7e4"/>`; }
  for (let la = 20; la <= 55; la += 5) { const y = H - ((la - lat0) / (lat1 - lat0)) * H; grid += `<line x1="0" x2="${W}" y1="${y}" y2="${y}" stroke="#e3e7e4"/>`; }
  const legs = {};
  D.bookings.forEach((b) => { const k = [b.origin, b.destination].sort().join("-"); legs[k] = legs[k] || { a: b.origin === "DXB" ? b.origin : b.destination, b: b.origin === "DXB" ? b.destination : b.origin, n: 0, cx: true }; if (b.status !== "CANCELLED") { legs[k].n++; legs[k].cx = false; } });
  const arcs = Object.entries(legs).map(([k, l]) => {
    const [x1, y1] = P(l.a), [x2, y2] = P(l.b), mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    const cx = mx + (dy / len) * len * 0.16, cy = my - (dx / len) * len * 0.16;   // bow each route to the side, like a printed route map
    return `<path class="arc ${l.cx ? "cx" : ""}" data-leg="${k}" style="stroke-width:${l.cx ? 2 : 1.5 + 1.4 * l.n}px" d="M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}"/>`;
  }).join("");
  const dests = [...new Set(D.bookings.flatMap((b) => [b.origin, b.destination]))];
  const pins = dests.map((c) => { const [x, y] = P(c); const hub = c === "DXB"; return `<circle cx="${x}" cy="${y}" r="${hub ? 6 : 4}" fill="${hub ? "var(--spruce)" : "#fff"}" stroke="var(--spruce)" stroke-width="2"/>
    <text x="${x + LBL[c][0]}" y="${y + LBL[c][1]}" text-anchor="${LBL[c][2]}" paint-order="stroke" stroke="#f4f5f2" stroke-width="${narrowMap ? 8 : 6}" stroke-linejoin="round" font-size="${narrowMap ? 23 : 16}" font-weight="600" font-stretch="75%" fill="#121614">${c} <tspan font-weight="400" fill="#545c58">${D.cities[c].replace(" Heathrow", "")}</tspan></text>`; }).join("");
  return `<svg viewBox="${narrowMap ? `0 -28 ${W + 80} ${H + 34}` : `0 0 ${W} ${H}`}" role="img" aria-label="Route map of the customer's flights from Dubai">${grid}${arcs}${pins}</svg>`;
}
function timeline() {
  const narrow = window.matchMedia("(max-width: 900px)").matches;
  const start = new Date("2025-12-01"), end = new Date("2027-01-01"), W = narrow ? 420 : 1120, x0 = 8, x1 = W - 8;
  const X = (d) => x0 + ((new Date(d) - start) / (end - start)) * (x1 - x0);
  let ticks = "";
  for (let i = 0; i <= 13; i++) { const d = new Date(start); d.setMonth(d.getMonth() + i); const x = X(d.toISOString().slice(0, 10));
    ticks += `<line x1="${x}" x2="${x}" y1="56" y2="62" stroke="#b9c0bc"/>${i < 13 ? `<text x="${x + 4}" y="80" font-size="14" fill="#3d4541" font-stretch="78%" ${d.getMonth() === 0 || i === 0 ? 'font-weight="600"' : ""}>${narrow ? MON[d.getMonth()].charAt(0) : MON[d.getMonth()]}${!narrow && (d.getMonth() === 0 || i === 0) ? " " + d.getFullYear() : ""}</text>` : ""}`; }
  const today = X(D.today);
  const marks = D.bookings.map((b) => { const x = X(b.departure.slice(0, 10)); const k = [b.origin, b.destination].sort().join("-");
    if (b.status === "CANCELLED") return `<g data-leg="${k}"><circle cx="${x}" cy="46" r="5.5" fill="#fff" stroke="var(--neg)" stroke-width="2"/></g>`;
    return `<g data-leg="${k}"><circle cx="${x}" cy="46" r="5.5" fill="${b.status === "CONFIRMED" ? "var(--amber)" : "var(--ink)"}"/></g>`; }).join("");
  return `<svg viewBox="0 0 ${W} 90" role="img" aria-label="Flights from December 2025 to December 2026, placed by date">
    <line x1="${x0}" x2="${x1}" y1="46" y2="46" stroke="#cfd5d1" stroke-width="2"/>${ticks}
    <line x1="${today}" x2="${today}" y1="20" y2="62" stroke="var(--amber)" stroke-width="2"/><text x="${today - 5}" y="17" font-size="14" font-weight="600" fill="var(--amber-ink)" text-anchor="end">Today</text>${marks}</svg>`;
}
function viewHistory() {
  const ex = D.excludedImports[0];
  const n = (s) => D.bookings.filter((b) => b.status === s).length;
  const routes = {};
  D.bookings.forEach((b) => { const far = b.origin === "DXB" ? b.destination : b.origin, k = [b.origin, b.destination].sort().join("-");
    const r = routes[k] = routes[k] || { far, k, flown: 0, cx: 0, up: 0, last: "" };
    if (b.status === "FLOWN") { r.flown++; if (b.departure > r.last) r.last = b.departure; } else if (b.status === "CANCELLED") r.cx++; else r.up++; });
  const rlist = Object.values(routes).sort((a, b) => (b.flown + b.up) - (a.flown + a.up) || b.last.localeCompare(a.last));
  return profile("history") + `
  <div class="notice" role="status">${icon("alert")}<div><b>1 imported reservation is not shown.</b> Booking <span class="code">${ex.bookingReference}</span> (import <span class="code">${ex.importId}</span>) has no departure date. The other ${D.bookings.length} bookings are complete.</div></div>
  <section class="tt timeline" id="tl" style="margin:24px 0 36px">
    <div class="tt-head"><h2>Dec 2025 to Dec 2026, to scale</h2><span class="meta">Hover a booking to find it here and on the map</span></div>${timeline()}
    <div class="legend"><span><i style="background:var(--ink)"></i>Flown ${n("FLOWN")}</span><span><i style="background:#fff;border:2px solid var(--neg)"></i>Cancelled ${n("CANCELLED")}</span><span><i style="background:var(--amber)"></i>Upcoming ${n("CONFIRMED")}</span></div>
  </section>
  <section class="tt" style="margin-bottom:36px">
    <div class="tt-head"><h2>Bookings</h2><span class="meta">Read-only, from the reservation system · most recent first</span></div>
    <div class="wrap-x"><table class="rows"><thead><tr><th>Date</th><th>Departs</th><th>Arrives</th><th>Flight</th><th style="width:26%">Route</th><th>Cabin</th><th>Booking ref</th><th>Booked on</th><th class="r">Status</th></tr></thead><tbody>
    ${D.bookings.map((b) => `<tr class="bk" data-leg="${[b.origin, b.destination].sort().join("-")}">
      <td class="semi">${b.departure.slice(0, 10)}</td><td>${b.departure.slice(11)}</td>
      <td>${b.arrival.slice(11)}${b.arrival.slice(0, 10) !== b.departure.slice(0, 10) ? ' <span class="muted">+1</span>' : ""}</td>
      <td class="code">${b.flightNumber}</td>
      <td><span class="semi cond">${b.origin} → ${b.destination}</span> <span class="muted">${D.cities[b.origin]} to ${D.cities[b.destination]}</span></td>
      <td>${b.cabinClass}</td><td class="code">${b.bookingReference}</td><td>${b.bookedOn}</td>
      <td class="r"><span class="tag ${BOOK[b.status]}">${nice(b.status)}</span></td></tr>`).join("")}
    </tbody></table></div>
  </section>
  <div class="travel">
    <section class="tt map" id="map"><div class="tt-head"><h2>Routes flown</h2><span class="meta">From the Dubai hub · line weight = trips</span></div>${routeMap()}</section>
    <section class="tt">
      <div class="tt-head"><h2>${rlist.length} routes</h2><span class="meta">Most used first</span></div>
      <div class="wrap-x"><table class="rows"><thead><tr><th>Route</th><th class="r">Flown</th><th class="r">Upcoming</th><th class="r">Cancelled</th><th class="r">Last flown</th></tr></thead><tbody>
      ${rlist.map((r) => `<tr class="bk" data-leg="${r.k}"><td><span class="semi cond">DXB ↔ ${r.far}</span> <span class="muted">${D.cities[r.far].replace(" Heathrow", "")}</span></td>
        <td class="r semi">${r.flown}</td><td class="r">${r.up}</td><td class="r">${r.cx}</td><td class="r">${r.last ? r.last.slice(0, 10) : "—"}</td></tr>`).join("")}
      </tbody></table></div>
    </section>
  </div>`;
}

// ---------------------------------------------------------------- UC-09
let A = { mode: "add", points: "2,000", reason: "Service recovery", note: "Flight 0018 LHR–DXB on 2026-10-30 was delayed and no meal was served. Second low rating in three months (feedback on booking R4TW9L)." };
function viewLoyalty() {
  const L2 = D.loyalty;
  return profile("loyalty") + `
  <div class="loyal">
    <div>
      <section class="balance" aria-label="Loyalty account">
        <div><div class="l">Points balance</div><div class="n" id="bal">${fmt(L2.pointsBalance)}<small>pts</small></div><div class="s">Account <span class="code">${L2.accountId}</span></div></div>
        <div><div class="l">Tier</div><div class="t">${tier(L2.tier)}</div><div class="s">Since ${L2.tierHistory[0].date}</div></div>
        <div><div class="l">Member since</div><div class="t">${L2.enrolledOn.slice(0, 4)}</div><div class="s">Enrolled ${L2.enrolledOn}</div></div>
      </section>
      <section class="tt" style="margin-bottom:36px">
        <div class="tt-head"><h2>Adjustment history</h2><span class="meta" id="adjMeta">${L2.adjustments.length} manual adjustments</span></div>
        <div class="wrap-x"><table class="rows"><thead><tr><th>Date</th><th class="r">Points</th><th>Reason code</th><th>Note</th><th>By</th><th class="r">Status</th></tr></thead><tbody id="adjRows">${L2.adjustments.map(adjRow).join("")}</tbody></table></div>
      </section>
      <section class="tt">
        <div class="tt-head"><h2>Tier history</h2><span class="meta">Every change with its date and reason</span></div>
        <div class="wrap-x"><table class="rows"><thead><tr><th>Date</th><th>Tier</th><th>Reason</th></tr></thead><tbody>
        ${L2.tierHistory.map((t) => `<tr><td class="semi" style="width:130px">${t.date}</td><td style="width:130px">${tier(t.tier)}</td><td>${t.reason}</td></tr>`).join("")}</tbody></table></div>
      </section>
    </div>
    <aside class="adjust" aria-labelledby="adjT">
      <h2 id="adjT">Adjust points</h2>
      <div class="perm">${icon("check", 14)}You have point-adjustment permission</div>
      <form id="af" novalidate>
        <div class="f"><span class="lab">Type</span><div class="seg" role="radiogroup" aria-label="Type">
          ${["add", "deduct"].map((m) => `<button type="button" role="radio" aria-checked="${A.mode === m}" data-mode="${m}">${m === "add" ? "Add points" : "Deduct points"}</button>`).join("")}</div></div>
        <div class="f" id="fP"><label for="pts">Points</label><input id="pts" class="in big" inputmode="numeric" value="${A.points ? fmt(parse(A.points)) : ""}">
          <div class="ptscale" aria-hidden="true"><div class="scale"><div class="track"></div><div class="fill" id="pfill" style="left:0"></div><div class="limit" style="left:60%"></div></div>
          <div class="ticks"><span>0</span><span style="margin-left:52%">3,000 review limit</span><span>5,000</span></div></div>
          <div class="err">Enter a number of points above 0.</div></div>
        <div class="f" id="fR"><label for="reason">Reason code</label><select id="reason" class="sel"><option value="">Choose a reason</option>${D.reasonCodes.map((r) => `<option ${r === A.reason ? "selected" : ""}>${r}</option>`).join("")}</select><div class="err">A reason code is required.</div></div>
        <div class="f" id="fN"><label for="note">Note</label><textarea id="note" class="ta">${esc(A.note)}</textarea><div class="err">A note is required.</div></div>
        <div class="preview" id="pv"></div>
        <div id="rule"></div>
        <button class="btn primary">Submit adjustment</button>
        <p class="fine">The tier is recalculated when the adjustment is applied. If saving fails, nothing changes.</p>
      </form>
    </aside>
  </div>`;
}
const adjRow = (a) => `<tr><td class="semi">${a.adjustedAt.slice(0, 10)}</td><td class="r semi">${signed(a.points)}</td><td>${a.reasonCode}</td>
  <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis" title="${esc(a.note)}">${esc(a.note)}</td><td class="code">${a.by}</td>
  <td class="r"><span class="tag ${ADJ[a.status][0]}">${ADJ[a.status][1]}</span></td></tr>`;
const parse = (s) => parseInt(String(s).replace(/[^\d]/g, ""), 10) || 0;
function preview() {
  const p = parse($("#pts").value), d = A.mode === "add" ? p : -p, bal = D.loyalty.pointsBalance, over = p > D.seniorThreshold;
  $("#pfill").style.transform = `scaleX(${Math.min(1, p / 5000)})`;
  $("#pfill").style.background = over ? "var(--amber)" : "var(--spruce)";
  $("#pv").innerHTML = `<span class="muted">Current balance</span><span>${fmt(bal)}</span><span class="muted">This adjustment</span><span>${signed(d)}</span>
    <span class="semi">New balance</span><span class="big">${fmt(bal + d)} pts</span>`;
  $("#rule").innerHTML = over
    ? `<div class="notice limit">${icon("alert")}<div><b>Needs Airline Management review.</b> Above ${fmt(D.seniorThreshold)} points, so the balance changes only after approval.</div></div>`
    : `<div class="notice info">${icon("info")}<div>Up to ${fmt(D.seniorThreshold)} points applies as soon as you submit.</div></div>`;
}
function bindLoyalty() {
  preview();
  $("#pts").addEventListener("input", (e) => { A.points = e.target.value; preview(); });
  $("#pts").addEventListener("blur", (e) => { const v = parse(e.target.value); e.target.value = v ? fmt(v) : ""; });
  $("#reason").addEventListener("change", (e) => { A.reason = e.target.value; });
  const grow = () => { const t = $("#note"); t.style.height = "auto"; t.style.height = Math.max(84, t.scrollHeight + 2) + "px"; };
  grow();
  $("#note").addEventListener("input", (e) => { A.note = e.target.value; grow(); });
  $$("[data-mode]").forEach((b) => b.addEventListener("click", () => { A.mode = b.dataset.mode; render(); }));
  $("#af").addEventListener("submit", (e) => {
    e.preventDefault();
    const p = parse($("#pts").value);
    const bad = { fP: !p, fR: !$("#reason").value, fN: !$("#note").value.trim() };   // UC-09 A1: reason code and note required
    Object.entries(bad).forEach(([id, b]) => $("#" + id).classList.toggle("bad", b));
    if (Object.values(bad).some(Boolean)) return;
    const d = A.mode === "add" ? p : -p, review = p > D.seniorThreshold;
    D.loyalty.adjustments.unshift({ adjustmentId: "ADJ-32004", adjustedAt: D.today, points: d, reasonCode: $("#reason").value, note: $("#note").value, by: D.staff.staffId, status: review ? "PENDING" : "APPROVED" });
    if (!review) D.loyalty.pointsBalance += d;
    A = { mode: "add", points: "", reason: "", note: "" };
    render();
    $("#rule").innerHTML = `<div class="notice info">${icon("check")}<div>${review ? "<b>Sent for review.</b> ADJ-32004 waits for Airline Management; the balance is unchanged." : `<b>Adjustment applied.</b> New balance ${fmt(D.loyalty.pointsBalance)} pts; tier recalculated: ${D.loyalty.tier}.`}</div></div>`;
  });
}

// ---------------------------------------------------------------- router
function render() {
  const [route, qs] = (location.hash.slice(1) || "home").split("?");
  const params = new URLSearchParams(qs || "");
  if (params.get("pts")) A.points = params.get("pts");
  if (params.get("q")) S.q = params.get("q");
  const view = { home: viewHome, search: viewSearch, history: viewHistory, loyalty: viewLoyalty }[route] || viewHome;
  renderNav(route);
  document.body.dataset.route = route;
  const sheet = $("#sheet");
  sheet.innerHTML = view();
  sheet.classList.remove("view-enter"); void sheet.offsetWidth; sheet.classList.add("view-enter");
  window.scrollTo(0, 0);
  $$("tr[data-go]").forEach((tr) => tr.addEventListener("click", () => (location.hash = tr.dataset.go)));
  if (route === "search") {
    $("#sf").addEventListener("submit", (e) => { e.preventDefault(); S.q = $("#q").value; S.sel = undefined; render(); });
    $$("tr[data-sel]").forEach((tr) => tr.addEventListener("click", () => { if (S.sel === tr.dataset.sel) location.hash = "#history"; else { S.sel = tr.dataset.sel; render(); } }));
    const c = $("[data-clear]"); if (c) c.addEventListener("click", (e) => { e.stopPropagation(); S.sel = null; render(); });
  }
  if (route === "history") {
    const map = $("#map"), tl = $("#tl");
    $$("tr.bk").forEach((tr) => {
      tr.addEventListener("mouseenter", () => { map.classList.add("focus"); tl.classList.add("focus"); $$(`.arc[data-leg="${tr.dataset.leg}"]`, map).concat($$(`g[data-leg="${tr.dataset.leg}"]`, tl)).forEach((a) => a.classList.add("on")); });
      tr.addEventListener("mouseleave", () => { map.classList.remove("focus"); tl.classList.remove("focus"); $$(".on", map).concat($$(".on", tl)).forEach((a) => a.classList.remove("on")); });
    });
    if (params.get("leg")) { const tr = $(`tr.bk[data-leg="${params.get("leg")}"]`); if (tr) { tr.dispatchEvent(new Event("mouseenter")); tr.classList.add("hover"); } }
  }
  if (route === "loyalty") bindLoyalty();
  const at = $(".tabs a.active"); if (at) at.parentElement.scrollLeft = at.offsetLeft - 16;
  $$(".wrap-x").forEach((w) => { if (w.scrollWidth > w.clientWidth + 4) w.insertAdjacentHTML("afterend", '<p class="cue">Swipe sideways for more columns →</p>'); });
}
window.addEventListener("hashchange", render);
document.addEventListener("keydown", (e) => { if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); location.hash = "#search"; } });
render();
