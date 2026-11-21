// AirlineCRM prototype v3 — "Timetable & Route Map". Screens rendered from data.js:
//   #login     Sign in. Every use case starts with an authenticated staff member (NFR-02, CO5 AccessControl)
//   #home      CSR home ("Today")
//   #search    UC-01 Locate Customer (A1: ?q=<customerId>&from=<notificationId>, A2: no match)
//   #overview  UC-03 View Customer Profile, the consolidated view UC-04 extends (UC-04 A1 stays here)
//   #history   UC-04 View Booking & Travel History (A2 excluded imports, A3 no valid bookings)
//   #loyalty   UC-09 Adjust Loyalty Points (A1 missing fields, A2 permission denied, A3 review, A4 rollback)
//   #reviews   UC-09 A3 from the Airline Management side: approve or reject adjustments above 3,000 points
// Customer screens take ?c=<customerId>. #loyalty also takes ?pts=<points> and ?simulate=failure (A4).
const D = DATA;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const fmt = (n) => n.toLocaleString("en-US");
const signed = (n) => (n > 0 ? "+" : n < 0 ? "−" : "") + fmt(Math.abs(n));
const nice = (e) => e.charAt(0) + e.slice(1).toLowerCase().replace(/_/g, " ");
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const days = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const plural = (n, one, many = one + "s") => `${n} ${n === 1 ? one : many}`;
const clock = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };
const daysBefore = (date, n) => new Date(Date.parse(date) - n * 864e5).toISOString().slice(0, 10);

// ---------------------------------------------------------------- record lookups
const cust = (id) => D.customers.find((c) => c.customerId === id);
const staffBy = (id) => D.staff.find((s) => s.staffId === id);
const staffName = (id) => (staffBy(id) || { fullName: id }).fullName;
const bookingsOf = (id) => D.bookings.filter((b) => b.customerId === id);          // newest first
const excludedOf = (id) => D.excludedImports.filter((x) => x.customerId === id);
const accountOf = (id) => D.loyaltyAccounts.find((a) => a.customerId === id);
const adjustmentsOf = (id) => D.adjustments.filter((a) => a.customerId === id);
const requestsOf = (id) => D.requests.filter((r) => r.customerId === id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
const feedbackOf = (id) => D.feedback.filter((f) => f.customerId === id).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
const isOpen = (r) => r.status !== "CLOSED";
const refsOf = (id) => [...new Set(bookingsOf(id).map((b) => b.bookingReference))];
const lastFlight = (id) => { const f = bookingsOf(id).find((b) => b.status === "FLOWN"); return f ? f.departure.slice(0, 10) : null; };
const tierFor = (pts) => D.tierThresholds.find(([, min]) => pts >= min)[0];
const to = (route, id) => `#${route}?c=${id}`;

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
  lock: '<rect x="3.5" y="7" width="9" height="6.5" rx="1"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/>',
  review: '<path d="M4 2.5h8v11H4Z"/><path d="m6 8.3 1.5 1.5 2.8-3"/>',
  chart: '<path d="M2.5 13.5h11M4.5 11V8M8 11V4.5M11.5 11V6.5"/>',
  out: '<path d="M6.5 13.5h-4v-11h4M10 5l3 3-3 3M13 8H6"/>',
};
const icon = (n, s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;
const MARK = '<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><path d="M3 23 C 8 15, 15 8, 23 3" fill="none" stroke="#d99a0e" stroke-width="2.2" stroke-linecap="round"/><circle cx="3" cy="23" r="2.6" fill="#fff"/><circle cx="23" cy="3" r="2.6" fill="#d99a0e"/></svg>';
const TIER_C = { Silver: "#9aa29e", Gold: "#8a7a3c", Platinum: "#5f7d8c" };
const tier = (t) => `<span class="tier" style="--tc:${TIER_C[t]}">${t}</span>`;
const initials = (name, cls = "") => `<span class="initials ${cls}" aria-hidden="true">${name.split(" ").map((w) => w[0]).filter((x) => /[A-Z]/.test(x)).slice(0, 2).join("")}</span>`;
const notice = (kind, ic, html, role = "status") => `<div class="notice ${kind}" role="${role}">${icon(ic)}<div>${html}</div></div>`;
const offAttrs = (why) => `aria-disabled="true" title="Outside this prototype: ${why}"`;
const clip = (text, w = 260) => `<span class="clip" style="max-width:${w}px" title="${esc(text)}">${esc(text)}</span>`;
const dots = (n) => `<span class="dots" role="img" aria-label="${n} out of 5">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</span>`;
const PRI = { URGENT: "neg", HIGH: "neg", MEDIUM: "mid", LOW: "" };
const REQ = { OPEN: "", IN_PROGRESS: "live", RESOLVED: "pos", CLOSED: "" };
const ADJ = { PENDING: ["open", "Pending review"], APPROVED: ["pos", "Approved"], REJECTED: ["neg", "Rejected"] };
const BOOK = { CONFIRMED: "live", FLOWN: "", CANCELLED: "neg" };
const NTF = { PENDING: "", SENT: "pos", FAILED: "neg" };

// ---------------------------------------------------------------- session (NFR-02) and audit log (FR-13, NFR-12)
// cyrb53 stands in for the server's one-way password hash; the prototype only ever compares hashes.
const hash = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) { ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, "0");
};
const SESSION_KEY = "airlinecrm.staffId";
let me = null;
try { const s = staffBy(sessionStorage.getItem(SESSION_KEY)); if (s && s.isActive && s.passwordHash) me = s; } catch (e) { /* storage blocked: sign in again */ }
function startSession(s) { me = s; try { sessionStorage.setItem(SESSION_KEY, s.staffId); } catch (e) { /* session lasts until reload */ } }
function endSession() { me = null; resetViews(); try { sessionStorage.removeItem(SESSION_KEY); } catch (e) { /* nothing stored */ } }
const isMgmt = () => !!me && me.role === "AIRLINE_MANAGEMENT";
// the CRM administrator holds every permission: the CSR screens (with point adjustment) and the review queue
const isAdmin = () => !!me && me.role === "CRM_ADMIN";
const canReview = () => isMgmt() || isAdmin();
const homeRoute = () => (isMgmt() ? "#reviews" : "#home");
function audit(action, outcome, detail, staffId) {
  const entry = { auditId: `AUD-${50211 + D.auditLog.length}`, staffId, action, outcome, detail, at: `${D.today} ${clock()}` };
  D.auditLog.push(entry);
  return entry;
}

// ---------------------------------------------------------------- shell
function renderShell(route) {
  const custRoute = ["search", "overview", "history", "loyalty"].includes(route);
  const on = (ic, label, href, active, count = "") => `<a href="${href}" class="${active ? "active" : ""}" ${active ? 'aria-current="page"' : ""}>${icon(ic)}<span>${label}</span>${count !== "" ? `<span class="count" aria-label="${count} need action">${count}</span>` : ""}</a>`;
  const off = (ic, label, why, count = "") => `<span class="off" ${offAttrs(why)}>${icon(ic)}<span>${label}</span>${count !== "" ? `<span class="count">${count}</span>` : ""}</span>`;
  let nav;
  if (isMgmt()) {
    const pending = D.adjustments.filter((a) => a.status === "PENDING").length;
    nav = on("review", "Point reviews", "#reviews", route === "reviews", pending || "") + on("users", "Customers", "#search", custRoute)
      + off("chart", "Satisfaction trends", "UC-07 View Satisfaction Trends") + off("chart", "Operational dashboard", "UC-15 View Operational Dashboard");
  } else {
    const mine = D.requests.filter((r) => r.assignedTo === me.staffId && isOpen(r)).length;
    const pending = D.adjustments.filter((a) => a.status === "PENDING").length;
    nav = on("home", "Home", "#home", route === "home")
      + (isAdmin() ? on("review", "Point reviews", "#reviews", route === "reviews", pending || "") : "")
      + on("users", "Customers", "#search", custRoute)
      + off("inbox", "Service requests", "UC-05 Manage Service Request", mine) + off("bell", "Notifications", "UC-14 Track Customer Notifications", D.notifications.length)
      + off("chat", "Feedback", "UC-06 Record Customer Feedback");
  }
  $("#nav").innerHTML = nav + `<div class="group">Account</div>` + off("gear", "Settings", "account settings");
  $("#me").innerHTML = `${initials(me.fullName, "on-rail")}<div><div class="me-name">${esc(me.fullName)}</div><div class="me-role">${D.roleNames[me.role]}</div></div>`;
  $("#topRight").innerHTML = `<span class="shift">${esc(me.shift)}</span>${initials(me.fullName)}<button class="btn ghost" id="signout" type="button">${icon("out")}Sign out</button>`;
  $(".mark").setAttribute("href", homeRoute());
  $("#signout").addEventListener("click", () => { endSession(); location.hash = "#login?out=1"; });
}

// ---------------------------------------------------------------- sign in
let LOGIN = { id: "" };
function loginArt() {
  // the brand's route map: every airport in the sample data, flown from the Dubai hub
  const W = 560, H = 250, codes = Object.keys(D.airports).filter((c) => c !== "MAA"), { P } = projector(codes, W, H);
  const [hx, hy] = P("DXB");
  const label = (c, fill) => { const [x, y] = P(c), [lx, ly, anchor] = LBL[c]; return `<text x="${x + lx}" y="${y + ly}" text-anchor="${anchor}" font-size="16" font-weight="600" font-stretch="75%" fill="${fill}">${c}</text>`; };
  const arcs = codes.filter((c) => c !== "DXB").map((c) => { const [x, y] = P(c), dx = x - hx, dy = y - hy;
    return `<path d="M${hx} ${hy} Q${(hx + x) / 2 + dy * 0.16} ${(hy + y) / 2 - dx * 0.16} ${x} ${y}" fill="none" stroke="#d99a0e" stroke-width="1.8"/>
      <circle cx="${x}" cy="${y}" r="4" fill="var(--spruce)" stroke="#fff" stroke-width="2"/>${label(c, "#9fc0b5")}`; }).join("");
  return `<svg class="login-art" viewBox="-40 -20 ${W + 60} ${H + 40}" aria-hidden="true">${arcs}<circle cx="${hx}" cy="${hy}" r="6" fill="#fff"/>${label("DXB", "#fff")}</svg>`;
}
function viewLogin(params) {
  const msg = params.get("out") ? notice("info", "check", "<b>You have signed out.</b> Customer records stay hidden until you sign in again.")
    : params.get("next") ? notice("info", "lock", "<b>Sign in to continue.</b> Customer records are shown only to signed-in staff.") : "";
  return `
  <div class="login">
    <section class="login-side" aria-label="About AirlineCRM">
      <div class="mark">${MARK}<span>AirlineCRM</span></div>
      <div><h1>Customer service workspace</h1><p>Find the caller by any identifier, read their travel and look after their points.</p></div>
      ${loginArt()}
      <p class="login-foot">For authorised airline staff. Sign-in attempts are recorded.</p>
    </section>
    <section class="login-main">
      <form class="login-form" id="lf" novalidate aria-labelledby="lt">
        <h2 id="lt">Sign in</h2>
        <p class="lede">Use your staff ID or work email.</p>
        <div id="lmsg">${msg}</div>
        <div class="f" id="fId"><label for="uid">Staff ID or email</label><input id="uid" class="in" autocomplete="username" autocapitalize="none" spellcheck="false" value="${esc(LOGIN.id)}" aria-describedby="eId"><div class="err" id="eId">Enter your staff ID or email.</div></div>
        <div class="f" id="fPw"><label for="pw">Password</label><input id="pw" class="in" type="password" autocomplete="current-password" aria-describedby="ePw"><div class="err" id="ePw">Enter your password.</div></div>
        <button class="btn primary wide">Sign in</button>
        <p class="fine">Prototype: the sample staff accounts are listed in README.md.</p>
      </form>
    </section>
  </div>`;
}
function bindLogin(params) {
  (LOGIN.id ? $("#pw") : $("#uid")).focus();
  $("#lf").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = $("#uid").value.trim(), pw = $("#pw").value;
    LOGIN.id = id;
    const bad = { fId: !id, fPw: !pw };
    Object.entries(bad).forEach(([f, b]) => { $("#" + f).classList.toggle("bad", b); $("#" + f + " .in").setAttribute("aria-invalid", b); });
    if (bad.fId || bad.fPw) { $("#lmsg").innerHTML = ""; (bad.fId ? $("#uid") : $("#pw")).focus(); return; }
    const key = id.toLowerCase();
    const s = D.staff.find((x) => x.passwordHash && (x.staffId.toLowerCase() === key || (x.email || "").toLowerCase() === key));
    const fail = (detail, html) => {
      audit("SIGN_IN", "DENIED", detail, s ? s.staffId : null);
      $("#lmsg").innerHTML = notice("neg", "alert", html, "alert");
      $("#pw").value = ""; $("#pw").focus();
    };
    if (!s || hash(`${s.staffId}:${pw}`) !== s.passwordHash) return fail(`Wrong staff ID or password for "${id}"`, "<b>Staff ID or password is incorrect.</b> Check both and try again.");
    if (!s.isActive) return fail("Account deactivated", "<b>This account has been deactivated.</b> Ask the CRM administrator to reactivate it.");
    startSession(s);
    LOGIN = { id: "" };
    const next = params.get("next");
    location.hash = next && next.startsWith("#") && !next.startsWith("#login") ? next : homeRoute();
  });
}

// ---------------------------------------------------------------- home (CSR)
function viewHome() {
  const t = new Date(D.today + "T00:00:00Z");
  const failed = D.notifications.filter((n) => n.status === "FAILED");
  const reqs = D.requests.filter((r) => r.assignedTo === me.staffId && isOpen(r)).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const open = reqs.filter((r) => r.status === "OPEN").length;
  const mine = D.adjustments.filter((a) => a.requestedBy === me.staffId);
  const pending = mine.filter((a) => a.status === "PENDING");
  const recentAdj = mine.filter((a) => a.adjustedAt.slice(0, 10) >= daysBefore(D.today, 30));
  const maxAge = Math.max(1, ...reqs.map((r) => days(r.createdAt, D.today)));
  const maxPts = 5000;
  const ntfLink = (n) => `#search?q=${n.customerId}&from=${n.notificationId}`;
  let lede = `<b>${plural(reqs.length, "open request")} and ${plural(D.notifications.length, "notification")}</b> are waiting for you.`;
  if (failed.length) {
    const fc = cust(failed[0].customerId);
    lede = failed[0].type === "FLIGHT_CHANGE"
      ? `<b>A flight-change notice to ${fc.fullName} failed after ${failed[0].retryCount} retries.</b> Call the customer about the retimed flight before working the queue.`
      : `<b>A notification to ${fc.fullName} failed after ${failed[0].retryCount} retries.</b> Contact the customer before working the queue.`;
  }
  return `
  <div class="head">
    <div><h1>${DAYS[t.getUTCDay()]} ${t.getUTCDate()} ${MONTHS[t.getUTCMonth()]}</h1><p class="lede">${lede}</p></div>
    <div class="actions"><button class="btn" ${offAttrs("UC-05 Manage Service Request")}>Log service request</button><a class="btn primary" href="#search">${icon("search")}Find customer</a></div>
  </div>

  <section class="figures" aria-label="Your queue">
    <div class="fig"><div class="n">${reqs.length}</div><div class="l">Open requests</div><div class="s">${open} open, ${reqs.length - open} in progress</div></div>
    <div class="fig"><div class="n">${D.notifications.length}</div><div class="l">Notifications to follow up</div><div class="s">${failed.length} failed delivery</div></div>
    <div class="fig"><div class="n">${pending.length}</div><div class="l">${pending.length === 1 ? "Adjustment" : "Adjustments"} awaiting review</div><div class="s">${pending.length ? `${fmt(pending.reduce((s, a) => s + a.points, 0))} pts with Airline Management` : "None with Airline Management"}</div></div>
    <div class="fig"><div class="n">${me.closedToday}</div><div class="l">Requests closed today</div><div class="s">Since the shift started</div></div>
  </section>

  <div class="cols">
    <section class="tt">
      <div class="tt-head"><h2>Notifications</h2><span class="meta">Newest first · opens the customer search</span></div>
      <div class="wrap-x"><table class="rows"><thead><tr><th>Notification</th><th>What happened</th><th>Customer</th><th class="r">Delivery</th></tr></thead><tbody>
      ${D.notifications.map((n) => `<tr class="go" data-go="${ntfLink(n)}">
        <td class="two"><span class="semi">${nice(n.type)}</span><span class="sub code">${n.notificationId}</span></td>
        <td>${n.body}</td><td><a class="link" href="${ntfLink(n)}">${cust(n.customerId).fullName}</a></td>
        <td class="r"><span class="tag ${NTF[n.status]}">${nice(n.status)}</span></td></tr>`).join("")}
      </tbody></table></div>
    </section>
    <section class="tt">
      <div class="tt-head"><h2>Recently viewed</h2><a class="btn ghost" href="#search">Search</a></div>
      <div class="wrap-x"><table class="rows"><thead><tr><th>Customer</th><th>Tier</th><th class="r">Customer ID</th></tr></thead><tbody>
      ${me.recent.length ? me.recent.map((id) => { const c = cust(id); return `<tr class="go" data-go="${to("overview", id)}"><td class="two"><span style="display:flex;align-items:center;gap:12px">${initials(c.fullName)}<span><a class="semi" href="${to("overview", id)}">${c.fullName}</a><span class="sub">Updated ${c.lastUpdated}</span></span></span></td>
        <td>${tier(accountOf(id).tier)}</td><td class="r code">${c.customerId}</td></tr>`; }).join("") : `<tr><td colspan="3" class="muted">No customers opened yet.</td></tr>`}
      </tbody></table></div>
    </section>
  </div>

  <div class="cols">
    <section class="tt">
      <div class="tt-head"><h2>Your open service requests</h2><span class="meta">Oldest first · bar = days open, to scale</span></div>
      <div class="wrap-x"><table class="rows"><thead><tr><th>Request</th><th>Customer</th><th>Category</th><th>Priority</th><th>Status</th><th style="width:22%">Age</th><th class="r">Days</th></tr></thead><tbody>
      ${reqs.length ? reqs.map((r) => { const a = days(r.createdAt, D.today); return `<tr>
        <td class="code">${r.requestId}</td><td><a class="link" href="${to("overview", r.customerId)}">${cust(r.customerId).fullName}</a></td><td>${nice(r.category)}</td>
        <td><span class="tag ${PRI[r.priority]}">${nice(r.priority)}</span></td><td><span class="tag ${REQ[r.status]}">${nice(r.status)}</span></td>
        <td><div class="bar" aria-hidden="true"><i style="width:${Math.max(2, (a / maxAge) * 100)}%"></i></div></td><td class="r semi">${a}</td></tr>`; }).join("") : `<tr><td colspan="7" class="muted">No open requests assigned to you.</td></tr>`}
      </tbody></table></div>
    </section>
    <section class="tt">
      <div class="tt-head"><h2>Your point adjustments</h2><span class="meta">Amber line = 3,000-point review limit</span></div>
      <div class="wrap-x"><table class="rows"><thead><tr><th>Customer</th><th>Points</th><th class="r">Status</th></tr></thead><tbody>
      ${recentAdj.length ? recentAdj.map((a) => { const w = Math.min(100, (Math.abs(a.points) / maxPts) * 100); return `<tr>
        <td class="two"><a class="semi" href="${to("loyalty", a.customerId)}">${cust(a.customerId).fullName}</a><span class="sub code">${a.adjustmentId}</span></td>
        <td><div style="display:grid;grid-template-columns:60px 96px;align-items:center;gap:10px"><span class="semi" style="text-align:right">${signed(a.points)}</span>
          <div class="scale" aria-hidden="true"><div class="track"></div><div class="fill" style="left:0;width:${w}%;background:${a.points < 0 ? "#9aa29e" : "var(--ink)"}"></div><div class="limit" style="left:${(D.seniorThreshold / maxPts) * 100}%"></div></div></div></td>
        <td class="r"><span class="tag ${ADJ[a.status][0]}">${ADJ[a.status][1]}</span></td></tr>`; }).join("") : `<tr><td colspan="3" class="muted">No adjustments in the last 30 days.</td></tr>`}
      </tbody></table></div>
    </section>
  </div>`;
}

// ---------------------------------------------------------------- UC-01 Locate Customer
const FIELDS = [["fullName", "Name"], ["customerId", "Customer ID"], ["email", "Email"], ["phoneNumber", "Phone"]];
function search(term) {
  const t = term.trim().toLowerCase(); if (!t) return [];
  const digits = t.replace(/\D/g, "").replace(/^0+/, "");   // local format 050… matches +971 50…
  return D.customers.flatMap((c) => {
    for (const [k, label] of FIELDS) {
      const v = c[k].toLowerCase();
      if (v.includes(t) || (k === "phoneNumber" && digits.length >= 4 && v.replace(/\D/g, "").includes(digits))) return [{ c, on: label, key: k }];
    }
    const ref = refsOf(c.customerId).find((r) => r.toLowerCase() === t);   // step 2: compare with the customer's booking references
    return ref ? [{ c, on: "Booking reference", key: "ref", ref }] : [];
  });
}
const hl = (text, q) => { const i = text.toLowerCase().indexOf(q.toLowerCase()); return i < 0 || !q ? esc(text) : esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length)); };
let S = { q: "Kheder", sel: "CUS-004182" };
function viewSearch(params) {
  if (params.has("q") && params.get("q") !== S.q) { S.q = params.get("q"); S.sel = undefined; }
  const from = D.notifications.find((n) => n.notificationId === params.get("from"));
  const res = search(S.q);
  if (S.sel === undefined || (S.sel && !res.some((r) => r.c.customerId === S.sel))) S.sel = res[0] ? res[0].c.customerId : null;
  const row = ({ c, on, key }) => {
    const sel = c.customerId === S.sel;
    const refs = refsOf(c.customerId).slice(0, 2);
    const reqs = requestsOf(c.customerId).filter(isOpen);
    return `<tr class="res go ${sel ? "sel" : ""}" data-sel="${c.customerId}" aria-expanded="${sel}">
      <td class="two"><span style="display:flex;align-items:center;gap:12px">${initials(c.fullName)}<span><span class="semi">${key === "fullName" ? hl(c.fullName, S.q) : esc(c.fullName)}</span><span class="sub">${key === "email" ? hl(c.email, S.q) : esc(c.email)}</span></span></span></td>
      <td class="code">${key === "customerId" ? hl(c.customerId, S.q) : c.customerId}</td><td>${c.phoneNumber}</td><td>${tier(accountOf(c.customerId).tier)}</td>
      <td><span class="tag">${on}</span></td><td class="r">${lastFlight(c.customerId) || '<span class="muted">None</span>'}</td></tr>
    ${sel ? `<tr class="detail"><td colspan="6"><div class="detail-grid">
      <div><h3>Contact</h3><dl class="kv"><dt>Phone</dt><dd>${c.phoneNumber}</dd><dt>Address</dt><dd>${c.mailingAddress}</dd><dt>Language</dt><dd>${c.preferredLanguage}</dd></dl></div>
      <div><h3>Check identity before sharing details</h3><dl class="kv"><dt>Date of birth</dt><dd>${c.dateOfBirth}</dd><dt>Recent bookings</dt><dd class="code">${refs.join(" · ") || "None"}</dd></dl></div>
      <div><h3>Record</h3><dl class="kv"><dt>Customer since</dt><dd>${c.createdAt}</dd><dt>Last updated</dt><dd>${c.lastUpdated}</dd><dt>Open requests</dt><dd>${reqs.length ? reqs.map((r) => `<span class="code">${r.requestId}</span> ${nice(r.category)}`).join(", ") : "0"}</dd></dl></div>
      <div class="act"><a class="btn primary" href="${to("overview", c.customerId)}">Open profile ${icon("arrow")}</a><button class="btn ghost" type="button" data-clear>Not this customer</button></div>
    </div></td></tr>` : ""}`;
  };
  return `
  <div class="head"><div><h1 class="small">Locate customer</h1><p class="lede">Ask the caller for any one identifier. Every matching profile is listed with the field it matched.</p></div></div>
  ${from ? `<div class="gap">${notice("info", "bell", `<b>Opened from notification <span class="code">${from.notificationId}</span>.</b> The link carried customer ID <span class="code">${from.customerId}</span>, so the search ran on that ID. The notification's delivery status is unchanged.`)}</div>` : ""}
  <form class="searchbox" id="sf" role="search"><div class="field">${icon("search", 20)}<input id="q" value="${esc(S.q)}" aria-label="Search term" autocomplete="off"></div><button class="btn primary">Search</button></form>
  <div class="keys">Searches <span>Name</span><span>Customer ID</span><span>Email</span><span>Phone</span><span>Booking reference</span></div>
  ${res.length ? `
  <section class="tt">
    <div class="tt-head"><h2>${res.length} ${res.length > 1 ? "customers match" : "customer matches"} “${esc(S.q)}”</h2><span class="meta">Select the caller to open their profile</span></div>
    <div class="wrap-x"><table class="rows results ${S.sel ? "has-sel" : ""}"><thead><tr><th style="width:32%">Customer</th><th>Customer ID</th><th>Phone</th><th>Tier</th><th>Matched on</th><th class="r">Last flight</th></tr></thead>
    <tbody>${res.map(row).join("")}</tbody></table></div>
  </section>` : `
  <section class="tt"><div style="padding:28px 0"><h2>No customer matches “${esc(S.q)}”</h2><p class="muted" style="margin:6px 0 0">Check the spelling, or ask for their email, phone number or a booking reference.</p></div></section>`}
  ${me.recent.length ? `<section class="tt" style="margin-top:36px"><div class="tt-head"><h2>Recently viewed</h2><span class="meta">Open a profile without searching</span></div>
    <div class="recent">${me.recent.map((id) => { const c = cust(id); return `<a href="${to("overview", id)}">${initials(c.fullName)}<span><span class="semi">${c.fullName}</span><span class="sub"><span class="code">${c.customerId}</span> · ${accountOf(id).tier}</span></span></a>`; }).join("")}</div></section>` : ""}`;
}
function bindSearch() {
  $("#sf").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = $("#q").value.trim();
    if (!q) { $("#q").focus(); return; }
    const h = "#search?q=" + encodeURIComponent(q);
    S.sel = undefined;
    if (location.hash === h) render(); else location.hash = h;
  });
  $$("tr[data-sel]").forEach((tr) => tr.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    if (S.sel === tr.dataset.sel) location.hash = to("overview", tr.dataset.sel); else { S.sel = tr.dataset.sel; render(); }
  }));
  const c = $("[data-clear]"); if (c) c.addEventListener("click", (e) => { e.stopPropagation(); S.sel = null; render(); });
}

// ---------------------------------------------------------------- customer profile header (shared by the profile tabs)
function touchRecent(id) { me.recent = [id, ...me.recent.filter((x) => x !== id)].slice(0, 4); }
function customerFrom(params) { return cust(params.get("c") || "CUS-004182"); }
function noCustomer(params) {
  return `<div class="crumb"><a href="#search">Customers</a></div><section class="tt"><div class="empty"><h2>No customer with ID “${esc(params.get("c"))}”</h2>
    <p class="muted">The link may be out of date. <a class="link" href="#search">Search for the customer</a> instead.</p></div></section>`;
}
function profile(c, tab) {
  touchRecent(c.customerId);
  const id = c.customerId;
  const tabs = [["Overview", "overview", ""], ["Travel history", "history", bookingsOf(id).length], ["Service requests", null, requestsOf(id).length, "UC-05 Manage Service Request"],
    ["Loyalty", "loyalty", adjustmentsOf(id).length], ["Feedback", null, feedbackOf(id).length, "UC-06 Record Customer Feedback"]];
  const count = (n) => (n !== "" ? `<span class="c">${n}</span>` : "");
  return `
  <div class="crumb"><a href="#search">Customers</a> / ${id}</div>
  <div class="head" style="margin-bottom:0">
    <div class="who">${initials(c.fullName)}<div><h1 class="small">${c.fullName}</h1></div>${tier(accountOf(id).tier)}</div>
    <div class="actions"><button class="btn" ${offAttrs("UC-16 Update Customer Profile")}>Edit profile</button><button class="btn" ${offAttrs("UC-05 Manage Service Request")}>Log service request</button></div>
  </div>
  <dl class="facts">
    <div><dt>Customer ID</dt><dd class="code">${id}</dd></div><div><dt>Email</dt><dd>${c.email}</dd></div>
    <div><dt>Phone</dt><dd>${c.phoneNumber}</dd></div><div><dt>Date of birth</dt><dd>${c.dateOfBirth}</dd></div>
    <div><dt>Language</dt><dd>${c.preferredLanguage}</dd></div><div><dt>Customer since</dt><dd>${c.createdAt}</dd></div>
    <div><dt>Address</dt><dd>${c.mailingAddress}</dd></div>
  </dl>
  <nav class="tabs" aria-label="Customer profile">${tabs.map(([label, route, n, why]) => route
    ? `<a href="${to(route, id)}" class="${route === tab ? "active" : ""}" ${route === tab ? 'aria-current="page"' : ""}>${label}${count(n)}</a>`
    : `<span class="off" ${offAttrs(why)}>${label}${count(n)}</span>`).join("")}</nav>`;
}

// ---------------------------------------------------------------- UC-03 profile overview
function viewOverview(params) {
  const c = customerFrom(params); if (!c) return noCustomer(params);
  const id = c.customerId, bs = bookingsOf(id), acct = accountOf(id), reqs = requestsOf(id), fb = feedbackOf(id), ex = excludedOf(id);
  const flown = bs.filter((b) => b.status === "FLOWN"), upcoming = bs.filter((b) => b.status === "CONFIRMED").reverse();
  const open = reqs.filter(isOpen), pending = adjustmentsOf(id).filter((a) => a.status === "PENDING");
  const lastAdj = adjustmentsOf(id).find((a) => a.status === "APPROVED");
  const avg = fb.length ? fb.reduce((s, f) => s + f.rating, 0) / fb.length : 0;
  return profile(c, "overview") + `
  <section class="figures" aria-label="Customer summary">
    <div class="fig"><div class="n">${flown.length}</div><div class="l">Flights flown</div><div class="s">${flown[0] ? `Last on ${flown[0].departure.slice(0, 10)}` : "None yet"}</div></div>
    <div class="fig"><div class="n">${upcoming.length}</div><div class="l">Upcoming ${upcoming.length === 1 ? "flight" : "flights"}</div><div class="s">${upcoming[0] ? `${upcoming[0].origin} → ${upcoming[0].destination} on ${upcoming[0].departure.slice(0, 10)}` : "None booked"}</div></div>
    <div class="fig"><div class="n">${fmt(acct.pointsBalance)}</div><div class="l">Points balance</div><div class="s">${acct.tier} tier${pending.length ? ` · ${plural(pending.length, "adjustment")} in review` : ""}</div></div>
    <div class="fig"><div class="n">${open.length}</div><div class="l">Open ${open.length === 1 ? "request" : "requests"}</div><div class="s">${reqs.length - open.length} closed</div></div>
  </section>
  <div class="cols">
    <section class="tt">
      <div class="tt-head"><h2>Recent travel</h2><a class="btn ghost" href="${to("history", id)}">Full travel history ${icon("arrow")}</a></div>
      ${bs.length ? `<div class="wrap-x"><table class="rows"><thead><tr><th>Date</th><th>Flight</th><th>Route</th><th>Cabin</th><th class="r">Status</th></tr></thead><tbody>
        ${bs.slice(0, 4).map((b) => `<tr><td class="semi">${b.departure.slice(0, 10)}</td><td class="code">${b.flightNumber}</td>
          <td><span class="semi cond">${b.origin} → ${b.destination}</span> <span class="muted">${D.cities[b.destination].replace(" Heathrow", "")}</span></td><td>${b.cabinClass}</td>
          <td class="r"><span class="tag ${BOOK[b.status]}">${nice(b.status)}</span></td></tr>`).join("")}</tbody></table></div>
        ${bs.length > 4 ? `<p class="muted more">${plural(bs.length - 4, "older booking")} in the full travel history.</p>` : ""}`
      : `<div class="empty"><h3>No bookings yet</h3><p class="muted">Nothing has been imported from the reservation system for this customer.</p></div>`}
      ${ex.length ? `<p class="muted more">${plural(ex.length, "imported reservation")} could not be read; see the travel history.</p>` : ""}
    </section>
    <section class="tt">
      <div class="tt-head"><h2>Loyalty</h2><a class="btn ghost" href="${to("loyalty", id)}">Open loyalty ${icon("arrow")}</a></div>
      <table class="rows kvrows"><tbody>
        <tr><th scope="row">Tier</th><td>${tier(acct.tier)} <span class="muted">since ${acct.tierHistory[0].date}</span></td></tr>
        <tr><th scope="row">Points balance</th><td class="semi">${fmt(acct.pointsBalance)} pts</td></tr>
        <tr><th scope="row">Account</th><td class="code">${acct.accountId}</td></tr>
        <tr><th scope="row">Last adjustment</th><td>${lastAdj ? `${signed(lastAdj.points)} on ${lastAdj.adjustedAt.slice(0, 10)} <span class="muted">${lastAdj.reasonCode}</span>` : '<span class="muted">None</span>'}</td></tr>
        <tr><th scope="row">In review</th><td>${pending.length ? pending.map((a) => `<span class="code">${a.adjustmentId}</span> ${signed(a.points)}`).join(", ") : '<span class="muted">None</span>'}</td></tr>
      </tbody></table>
    </section>
  </div>
  <div class="cols">
    <section class="tt">
      <div class="tt-head"><h2>Service requests</h2><span class="meta">Newest first</span></div>
      ${reqs.length ? `<div class="wrap-x"><table class="rows"><thead><tr><th>Request</th><th>Opened</th><th>Category</th><th>Description</th><th>Priority</th><th class="r">Status</th></tr></thead><tbody>
        ${reqs.map((r) => `<tr><td class="code">${r.requestId}</td><td>${r.createdAt}</td><td>${nice(r.category)}</td><td>${clip(r.description)}</td>
          <td><span class="tag ${PRI[r.priority]}">${nice(r.priority)}</span></td><td class="r"><span class="tag ${REQ[r.status]}">${nice(r.status)}</span></td></tr>`).join("")}</tbody></table></div>`
      : `<div class="empty"><p class="muted">No service requests.</p></div>`}
    </section>
    <section class="tt">
      <div class="tt-head"><h2>Feedback</h2><span class="meta">${fb.length ? `Average ${avg.toFixed(1)} of 5 · dots = rating` : ""}</span></div>
      ${fb.length ? `<div class="wrap-x"><table class="rows"><thead><tr><th>Date</th><th>Booking</th><th>Category</th><th class="r">Rating</th></tr></thead><tbody>
        ${fb.map((f) => `<tr title="${esc(f.comment)}"><td>${f.submittedAt}</td><td class="code">${f.bookingReference}</td><td>${f.category}</td><td class="r">${dots(f.rating)}<span class="semi">${f.rating}</span></td></tr>`).join("")}</tbody></table></div>`
      : `<div class="empty"><p class="muted">No feedback recorded.</p></div>`}
    </section>
  </div>`;
}

// ---------------------------------------------------------------- UC-04 View Booking & Travel History
const LBL = { DXB: [-12, 20, "end"], MCT: [10, 5, "start"], LHR: [10, -8, "start"], IST: [10, -8, "start"], BEY: [-10, -6, "end"], AMM: [-4, 26, "start"], CAI: [-10, -6, "end"], MAA: [-10, -6, "end"] };
const legOf = (b) => [b.origin, b.destination].sort().join("-");
// Equirectangular projection. The default frame covers Europe and the Middle East; it grows (keeping its
// aspect, so nothing is stretched) when a customer flies somewhere outside it.
function projector(codes, W, H) {
  const b = { lon0: -6, lon1: 70, lat0: 21, lat1: 54 }, k = 76 / 33;
  codes.forEach((c) => { const [lo, la] = D.airports[c];
    if (lo < b.lon0 + 3) b.lon0 = lo - 10; if (lo > b.lon1 - 3) b.lon1 = lo + 10;
    if (la < b.lat0 + 2) b.lat0 = la - 8; if (la > b.lat1 - 2) b.lat1 = la + 6; });
  const w = b.lon1 - b.lon0, h = b.lat1 - b.lat0;
  if (w / h > k) { const add = (w / k - h) / 2; b.lat0 -= add; b.lat1 += add; } else if (w / h < k) { const add = (h * k - w) / 2; b.lon0 -= add; b.lon1 += add; }
  const P = (code) => { const [lo, la] = D.airports[code]; return [((lo - b.lon0) / (b.lon1 - b.lon0)) * W, H - ((la - b.lat0) / (b.lat1 - b.lat0)) * H]; };
  return { P, b };
}
function routeMap(bs) {
  const narrowMap = window.matchMedia("(max-width: 900px)").matches;   // labels stay >= 12px when the map is drawn at phone width
  const W = 560, H = 250;
  const dests = [...new Set(bs.flatMap((b) => [b.origin, b.destination]))];
  const { P, b: box } = projector(dests, W, H);
  let grid = "";
  for (let lo = Math.ceil(box.lon0 / 10) * 10; lo < box.lon1; lo += 10) { const [x] = [((lo - box.lon0) / (box.lon1 - box.lon0)) * W]; grid += `<line x1="${x}" x2="${x}" y1="0" y2="${H}" stroke="#e3e7e4"/>`; }
  for (let la = Math.ceil(box.lat0 / 5) * 5; la < box.lat1; la += 5) { const y = H - ((la - box.lat0) / (box.lat1 - box.lat0)) * H; grid += `<line x1="0" x2="${W}" y1="${y}" y2="${y}" stroke="#e3e7e4"/>`; }
  const legs = {};
  bs.forEach((b) => { const k = legOf(b); legs[k] = legs[k] || { a: b.origin === "DXB" ? b.origin : b.destination, b: b.origin === "DXB" ? b.destination : b.origin, n: 0, cx: true }; if (b.status !== "CANCELLED") { legs[k].n++; legs[k].cx = false; } });
  const arcs = Object.entries(legs).map(([k, l]) => {
    const [x1, y1] = P(l.a), [x2, y2] = P(l.b), mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
    const cx = mx + dy * 0.16, cy = my - dx * 0.16;   // bow each route to the side, like a printed route map
    return `<path class="arc ${l.cx ? "cx" : ""}" data-leg="${k}" style="stroke-width:${l.cx ? 2 : 1.5 + 1.4 * l.n}px" d="M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}"/>`;
  }).join("");
  const pins = dests.map((c) => { const [x, y] = P(c); const hub = c === "DXB"; const [lx, ly, anchor] = LBL[c] || [10, -8, "start"]; return `<circle cx="${x}" cy="${y}" r="${hub ? 6 : 4}" fill="${hub ? "var(--spruce)" : "#fff"}" stroke="var(--spruce)" stroke-width="2"/>
    <text x="${x + lx}" y="${y + ly}" text-anchor="${anchor}" paint-order="stroke" stroke="#f4f5f2" stroke-width="${narrowMap ? 8 : 6}" stroke-linejoin="round" font-size="${narrowMap ? 23 : 16}" font-weight="600" font-stretch="75%" fill="#121614">${c} <tspan font-weight="400" fill="#545c58">${D.cities[c].replace(" Heathrow", "")}</tspan></text>`; }).join("");
  return `<svg viewBox="${narrowMap ? `0 -28 ${W + 80} ${H + 34}` : `0 0 ${W} ${H}`}" role="img" aria-label="Route map of the customer's flights from Dubai">${grid}${arcs}${pins}</svg>`;
}
// Dated axis: at least 13 months, ending with the month after the latest flight (or today).
function timeSpan(bs) {
  const latest = bs.reduce((m, b) => (b.departure.slice(0, 10) > m ? b.departure.slice(0, 10) : m), D.today);
  const earliest = bs.reduce((m, b) => (b.departure.slice(0, 10) < m ? b.departure.slice(0, 10) : m), D.today);
  const l = new Date(latest + "T00:00:00Z"), e = new Date(earliest + "T00:00:00Z");
  const end = new Date(Date.UTC(l.getUTCFullYear(), l.getUTCMonth() + 1, 1));
  let start = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 13, 1));
  const first = new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), 1));
  if (first < start) start = first;
  const months = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth();
  const last = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 1, 1));
  return { start, end, months, label: `${MON[start.getUTCMonth()]} ${start.getUTCFullYear()} to ${MON[last.getUTCMonth()]} ${last.getUTCFullYear()}` };
}
function timeline(bs) {
  const narrow = window.matchMedia("(max-width: 900px)").matches;
  const { start, end, months, label } = timeSpan(bs), W = narrow ? 420 : 1120, x0 = 8, x1 = W - 8;
  const X = (d) => x0 + ((new Date(d + "T00:00:00Z") - start) / (end - start)) * (x1 - x0);
  const step = months > 15 ? Math.ceil(months / 13) : 1;
  let ticks = "";
  for (let i = 0; i <= months; i++) { const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + i, 1)); const x = X(d.toISOString().slice(0, 10)), m = d.getUTCMonth();
    ticks += `<line x1="${x}" x2="${x}" y1="56" y2="62" stroke="#b9c0bc"/>${i < months && i % step === 0 ? `<text x="${x + 4}" y="80" font-size="14" fill="#3d4541" font-stretch="78%" ${m === 0 || i === 0 ? 'font-weight="600"' : ""}>${narrow ? MON[m].charAt(0) : MON[m]}${!narrow && (m === 0 || i === 0) ? " " + d.getUTCFullYear() : ""}</text>` : ""}`; }
  const today = X(D.today);
  const marks = bs.map((b) => { const x = X(b.departure.slice(0, 10)), k = legOf(b);
    if (b.status === "CANCELLED") return `<g data-leg="${k}"><circle cx="${x}" cy="46" r="5.5" fill="#fff" stroke="var(--neg)" stroke-width="2"/></g>`;
    return `<g data-leg="${k}"><circle cx="${x}" cy="46" r="5.5" fill="${b.status === "CONFIRMED" ? "var(--amber)" : "var(--ink)"}"/></g>`; }).join("");
  return `<svg viewBox="0 0 ${W} 90" role="img" aria-label="Flights from ${label}, placed by date">
    <line x1="${x0}" x2="${x1}" y1="46" y2="46" stroke="#cfd5d1" stroke-width="2"/>${ticks}
    <line x1="${today}" x2="${today}" y1="20" y2="62" stroke="var(--amber)" stroke-width="2"/><text x="${today - 5}" y="17" font-size="14" font-weight="600" fill="var(--amber-ink)" text-anchor="end">Today</text>${marks}</svg>`;
}
function viewHistory(params) {
  const c = customerFrom(params); if (!c) return noCustomer(params);
  const id = c.customerId, bs = bookingsOf(id), ex = excludedOf(id);
  const n = (s) => bs.filter((b) => b.status === s).length;
  // A2: name each excluded record and keep the valid history (NFR-03)
  const exNotice = ex.length ? `<div class="notice" role="status">${icon("alert")}<div><b>${ex.length === 1 ? "1 imported reservation is" : `${ex.length} imported reservations are`} not shown.</b>
    ${ex.map((x) => `Booking <span class="code">${x.bookingReference}</span> (import <span class="code">${x.importId}</span>): ${x.errorMessage.toLowerCase()}.`).join(" ")}
    ${bs.length ? `The other ${plural(bs.length, "booking")} ${bs.length === 1 ? "is" : "are"} complete.` : "No other bookings were imported."}</div></div>` : "";
  if (!bs.length) {   // A3: no valid bookings, an empty history is displayed
    return profile(c, "history") + exNotice + `
    <section class="tt" style="margin-top:${ex.length ? 24 : 0}px">
      <div class="tt-head"><h2>Bookings</h2><span class="meta">Read-only, from the reservation system · most recent first</span></div>
      <div class="empty"><h3>No bookings to show</h3><p class="muted">${c.fullName} has no valid reservations in the imported data. Bookings appear here once the reservation system sends them.</p></div>
    </section>`;
  }
  const routes = {};
  bs.forEach((b) => { const far = b.origin === "DXB" ? b.destination : b.origin, k = legOf(b);
    const r = routes[k] = routes[k] || { far, k, flown: 0, cx: 0, up: 0, last: "" };
    if (b.status === "FLOWN") { r.flown++; if (b.departure > r.last) r.last = b.departure; } else if (b.status === "CANCELLED") r.cx++; else r.up++; });
  const rlist = Object.values(routes).sort((a, b) => (b.flown + b.up) - (a.flown + a.up) || b.last.localeCompare(a.last));
  return profile(c, "history") + exNotice + `
  <section class="tt timeline" id="tl" style="margin:${ex.length ? 24 : 0}px 0 36px">
    <div class="tt-head"><h2>${timeSpan(bs).label}, to scale</h2><span class="meta">Hover a booking to find it here and on the map</span></div>${timeline(bs)}
    <div class="legend"><span><i style="background:var(--ink)"></i>Flown ${n("FLOWN")}</span><span><i style="background:#fff;border:2px solid var(--neg)"></i>Cancelled ${n("CANCELLED")}</span><span><i style="background:var(--amber)"></i>Upcoming ${n("CONFIRMED")}</span></div>
  </section>
  <section class="tt" style="margin-bottom:36px">
    <div class="tt-head"><h2>Bookings</h2><span class="meta">Read-only, from the reservation system · most recent first</span></div>
    <div class="wrap-x"><table class="rows"><thead><tr><th>Date</th><th>Departs</th><th>Arrives</th><th>Flight</th><th style="width:26%">Route</th><th>Cabin</th><th>Booking ref</th><th>Booked on</th><th class="r">Status</th></tr></thead><tbody>
    ${bs.map((b) => `<tr class="bk" data-leg="${legOf(b)}" ${b.note ? `title="${esc(b.note)}"` : ""}>
      <td class="semi">${b.departure.slice(0, 10)}</td><td>${b.departure.slice(11)}</td>
      <td>${b.arrival.slice(11)}${b.arrival.slice(0, 10) !== b.departure.slice(0, 10) ? ' <span class="muted">+1</span>' : ""}</td>
      <td class="code">${b.flightNumber}</td>
      <td><span class="semi cond">${b.origin} → ${b.destination}</span> <span class="muted">${D.cities[b.origin]} to ${D.cities[b.destination]}</span></td>
      <td>${b.cabinClass}</td><td class="code">${b.bookingReference}</td><td>${b.bookedOn}</td>
      <td class="r"><span class="tag ${BOOK[b.status]}">${nice(b.status)}</span></td></tr>`).join("")}
    </tbody></table></div>
  </section>
  <div class="travel">
    <section class="tt map" id="map"><div class="tt-head"><h2>Routes flown</h2><span class="meta">From the Dubai hub · line weight = trips</span></div>${routeMap(bs)}</section>
    <section class="tt">
      <div class="tt-head"><h2>${plural(rlist.length, "route")}</h2><span class="meta">Most used first</span></div>
      <div class="wrap-x"><table class="rows"><thead><tr><th>Route</th><th class="r">Flown</th><th class="r">Upcoming</th><th class="r">Cancelled</th><th class="r">Last flown</th></tr></thead><tbody>
      ${rlist.map((r) => `<tr class="bk" data-leg="${r.k}"><td><span class="semi cond">DXB ↔ ${r.far}</span> <span class="muted">${D.cities[r.far].replace(" Heathrow", "")}</span></td>
        <td class="r semi">${r.flown}</td><td class="r">${r.up}</td><td class="r">${r.cx}</td><td class="r">${r.last ? r.last.slice(0, 10) : "—"}</td></tr>`).join("")}
      </tbody></table></div>
    </section>
  </div>`;
}
function bindHistory(params) {
  const map = $("#map"), tl = $("#tl");
  if (!map || !tl) return;
  $$("tr.bk").forEach((tr) => {
    tr.addEventListener("mouseenter", () => { map.classList.add("focus"); tl.classList.add("focus"); $$(`.arc[data-leg="${tr.dataset.leg}"]`, map).concat($$(`g[data-leg="${tr.dataset.leg}"]`, tl)).forEach((a) => a.classList.add("on")); });
    tr.addEventListener("mouseleave", () => { map.classList.remove("focus"); tl.classList.remove("focus"); $$(".on", map).concat($$(".on", tl)).forEach((a) => a.classList.remove("on")); });
  });
  if (params.get("leg")) { const tr = $(`tr.bk[data-leg="${params.get("leg")}"]`); if (tr) { tr.dispatchEvent(new Event("mouseenter")); tr.classList.add("hover"); } }
}

// ---------------------------------------------------------------- UC-09 Adjust Loyalty Points
// LoyaltyAccount.applyAdjustment() + recalculateTier(), committed together (NFR-09)
function applyAdjustment(acct, adj) {
  const before = acct.tier;
  acct.pointsBalance += adj.points;
  acct.tier = tierFor(acct.pointsBalance);
  if (acct.tier !== before) acct.tierHistory.unshift({ date: D.today, tier: acct.tier, reason: `Recalculated after adjustment ${adj.adjustmentId}` });
  return { before, after: acct.tier };
}
const tierChange = ({ before, after }) => (before === after ? `${after} (unchanged)` : `${before} → ${after}`);
const nextAdjustmentId = () => `ADJ-${Math.max(...D.adjustments.map((a) => +a.adjustmentId.slice(4))) + 1}`;
const parse = (s) => parseInt(String(s).replace(/[^\d]/g, ""), 10) || 0;
let A = null;   // the adjust-points form, kept per customer while the CSR moves between tabs
function freshForm(id) {
  // Layla's form opens on scenario S-03 (2,000 goodwill points after a delayed flight) for the report screenshot
  return id === "CUS-004182"
    ? { c: id, mode: "add", points: "2,000", reason: "Service recovery", note: "Flight 0018 LHR–DXB on 2026-10-30 was delayed and no meal was served. Second low rating in three months (feedback on booking R4TW9L).", result: "" }
    : { c: id, mode: "add", points: "", reason: "", note: "", result: "" };
}
function viewLoyalty(params) {
  const c = customerFrom(params); if (!c) return noCustomer(params);
  const id = c.customerId, acct = accountOf(id), adjs = adjustmentsOf(id);
  if (!A || A.c !== id) A = freshForm(id);
  if (params.get("pts") && A.fromHash !== location.hash) { A.points = params.get("pts"); A.fromHash = location.hash; }
  const perm = me.canAdjustPoints
    ? `<div class="perm">${icon("check", 14)}You have point-adjustment permission</div>`
    : `<div class="perm no">${icon("lock", 14)}Your account has no point-adjustment permission</div>`;
  return profile(c, "loyalty") + `
  <div class="loyal">
    <div>
      <section class="balance" aria-label="Loyalty account">
        <div><div class="l">Points balance</div><div class="n" id="bal">${fmt(acct.pointsBalance)}<small>pts</small></div><div class="s">Account <span class="code">${acct.accountId}</span></div></div>
        <div><div class="l">Tier</div><div class="t">${tier(acct.tier)}</div><div class="s">Since ${acct.tierHistory[0].date}</div></div>
        <div><div class="l">Member since</div><div class="t">${acct.enrolledOn.slice(0, 4)}</div><div class="s">Enrolled ${acct.enrolledOn}</div></div>
      </section>
      <section class="tt" style="margin-bottom:36px">
        <div class="tt-head"><h2>Adjustment history</h2><span class="meta">${plural(adjs.length, "manual adjustment")}</span></div>
        ${adjs.length ? `<div class="wrap-x"><table class="rows"><thead><tr><th>Date</th><th class="r">Points</th><th>Reason code</th><th>Note</th><th>By</th><th class="r">Status</th></tr></thead><tbody>${adjs.map(adjRow).join("")}</tbody></table></div>`
          : `<div class="empty"><p class="muted">No manual adjustments yet.</p></div>`}
      </section>
      <section class="tt">
        <div class="tt-head"><h2>Tier history</h2><span class="meta">Every change with its date and reason</span></div>
        <div class="wrap-x"><table class="rows"><thead><tr><th>Date</th><th>Tier</th><th>Reason</th></tr></thead><tbody>
        ${acct.tierHistory.map((t) => `<tr><td class="semi" style="width:130px">${t.date}</td><td style="width:130px">${tier(t.tier)}</td><td>${t.reason}</td></tr>`).join("")}</tbody></table></div>
      </section>
    </div>
    <aside class="adjust" aria-labelledby="adjT">
      <h2 id="adjT">Adjust points</h2>
      ${perm}
      <div id="result" aria-live="polite">${A.result}</div>
      <form id="af" novalidate>
        <div class="f"><span class="lab" id="typeL">Type</span><div class="seg" role="radiogroup" aria-labelledby="typeL">
          ${["add", "deduct"].map((m) => `<button type="button" role="radio" aria-checked="${A.mode === m}" data-mode="${m}">${m === "add" ? "Add points" : "Deduct points"}</button>`).join("")}</div></div>
        <div class="f" id="fP"><label for="pts">Points</label><input id="pts" class="in big" inputmode="numeric" value="${A.points ? fmt(parse(A.points)) : ""}" aria-describedby="eP">
          <div class="ptscale" aria-hidden="true"><div class="scale"><div class="track"></div><div class="fill" id="pfill" style="left:0"></div><div class="limit" style="left:60%"></div></div>
          <div class="ticks"><span>0</span><span style="margin-left:52%">3,000 review limit</span><span>5,000</span></div></div>
          <div class="err" id="eP">Enter a number of points above 0.</div></div>
        <div class="f" id="fR"><label for="reason">Reason code</label><select id="reason" class="sel" aria-describedby="eR"><option value="">Choose a reason</option>${D.reasonCodes.map((r) => `<option ${r === A.reason ? "selected" : ""}>${r}</option>`).join("")}</select><div class="err" id="eR">A reason code is required.</div></div>
        <div class="f" id="fN"><label for="note">Note</label><textarea id="note" class="ta" aria-describedby="eN">${esc(A.note)}</textarea><div class="err" id="eN">A note is required.</div></div>
        <div class="preview" id="pv"></div>
        <div id="rule"></div>
        <button class="btn primary" id="submitAdj">Submit adjustment</button>
        <p class="fine">The tier is recalculated when the adjustment is applied. If saving fails, nothing changes.</p>
      </form>
    </aside>
  </div>`;
}
const adjRow = (a) => {
  const review = a.reviewedBy ? `${ADJ[a.status][1]} by ${staffName(a.reviewedBy)} on ${a.reviewedAt.slice(0, 10)}${a.reviewNote ? `: ${a.reviewNote}` : ""}` : "";
  return `<tr><td class="semi">${a.adjustedAt.slice(0, 10)}</td><td class="r semi">${signed(a.points)}</td><td>${a.reasonCode}</td>
  <td>${clip(a.note, 200)}</td><td class="code" title="${esc(staffName(a.requestedBy))}">${a.requestedBy}</td>
  <td class="r"><span class="tag ${ADJ[a.status][0]}" ${review ? `title="${esc(review)}"` : ""}>${ADJ[a.status][1]}</span></td></tr>`;
};
function preview() {
  const acct = accountOf(A.c);
  const p = parse($("#pts").value), d = A.mode === "add" ? p : -p, bal = acct.pointsBalance, over = p > D.seniorThreshold;
  const newTier = tierFor(Math.max(0, bal + d));
  $("#pfill").style.transform = `scaleX(${Math.min(1, p / 5000)})`;
  $("#pfill").style.background = over ? "var(--amber)" : "var(--spruce)";
  $("#pv").innerHTML = `<span class="muted">Current balance</span><span>${fmt(bal)}</span><span class="muted">This adjustment</span><span>${signed(d)}</span>
    <span class="semi">${over ? "New balance after approval" : "New balance"}</span><span class="big">${fmt(bal + d)} pts</span>
    ${newTier !== acct.tier && p ? `<span class="muted">Tier</span><span class="semi">${acct.tier} → ${newTier}</span>` : ""}`;
  $("#rule").innerHTML = over
    ? `<div class="notice limit">${icon("alert")}<div><b>Needs Airline Management review.</b> Above ${fmt(D.seniorThreshold)} points, so the balance changes only after approval.</div></div>`
    : `<div class="notice info">${icon("info")}<div>Up to ${fmt(D.seniorThreshold)} points applies as soon as you submit.</div></div>`;
  $("#submitAdj").textContent = over ? "Send for review" : "Submit adjustment";
}
function bindLoyalty(params) {
  if (!$("#af")) return;
  preview();
  const clearResult = () => { if (A.result) { A.result = ""; $("#result").innerHTML = ""; } };
  $("#pts").addEventListener("input", (e) => { A.points = e.target.value; clearResult(); preview(); });
  $("#pts").addEventListener("blur", (e) => { const v = parse(e.target.value); e.target.value = v ? fmt(v) : ""; });
  $("#reason").addEventListener("change", (e) => { A.reason = e.target.value; clearResult(); });
  const grow = () => { const t = $("#note"); t.style.height = "auto"; t.style.height = Math.max(84, t.scrollHeight + 2) + "px"; };
  grow();
  $("#note").addEventListener("input", (e) => { A.note = e.target.value; clearResult(); grow(); });
  $$("[data-mode]").forEach((b) => b.addEventListener("click", () => { A.mode = b.dataset.mode; A.result = ""; render(); }));
  $("#af").addEventListener("submit", (e) => {
    e.preventDefault();
    const acct = accountOf(A.c), name = cust(A.c).fullName;
    const p = parse($("#pts").value), d = A.mode === "add" ? p : -p, reason = $("#reason").value, note = $("#note").value.trim();
    const show = (html) => { A.result = html; $("#result").innerHTML = html; $("#result").scrollIntoView({ block: "nearest" }); };
    // step 3: the adjustment is created and validated; A1: a missing reason code or note refuses it
    const belowZero = d < 0 && acct.pointsBalance + d < 0;
    $("#eP").textContent = belowZero ? `A deduction can't take the balance below 0 (now ${fmt(acct.pointsBalance)} pts).` : "Enter a number of points above 0.";
    const bad = { fP: !p || belowZero, fR: !reason, fN: !note };
    Object.entries(bad).forEach(([f, b]) => { $("#" + f).classList.toggle("bad", b); $("#" + f + " .in, #" + f + " .sel, #" + f + " .ta").setAttribute("aria-invalid", b); });
    const firstBad = Object.keys(bad).find((f) => bad[f]);
    if (firstBad) {
      show(notice("neg", "alert", "<b>Adjustment refused.</b> Complete the marked fields. Nothing was changed.", "alert"));
      $(`#${firstBad} .in, #${firstBad} .sel, #${firstBad} .ta`).focus();
      return;
    }
    // step 4, A2: the server checks the adjust-points permission and logs a denied attempt
    if (!me.canAdjustPoints) {
      const entry = audit("ADJUST_POINTS", "DENIED", `${signed(d)} pts on ${acct.accountId}`, me.staffId);
      show(notice("neg", "lock", `<b>Adjustment refused: no point-adjustment permission.</b> The attempt was recorded in the audit log as <span class="code">${entry.auditId}</span>. Nothing was changed; ask the CRM administrator for the permission.`, "alert"));
      return;
    }
    // A4: the transaction fails, so the balance, tier and adjustment roll back together (NFR-09)
    if (params.get("simulate") === "failure") {
      show(notice("neg", "alert", `<b>Adjustment failed and was rolled back.</b> The balance (${fmt(acct.pointsBalance)} pts), the tier and the adjustment record are unchanged. Try again in a moment.`, "alert"));
      return;
    }
    // step 5, A3: above 3,000 points the adjustment waits for Airline Management
    const review = p > D.seniorThreshold;
    const adj = { adjustmentId: nextAdjustmentId(), customerId: A.c, adjustedAt: `${D.today} ${clock()}`, points: d, reasonCode: reason, note, requestedBy: me.staffId, status: review ? "PENDING" : "APPROVED" };
    D.adjustments.unshift(adj);
    const result = review
      ? notice("info", "check", `<b>Sent for review.</b> <span class="code">${adj.adjustmentId}</span> waits for Airline Management; ${name}'s balance stays at ${fmt(acct.pointsBalance)} pts until it is approved.`)
      // steps 6–7: apply and recalculate the tier in one transaction, then show the new balance and tier
      : (() => { const t = applyAdjustment(acct, adj); return notice("info", "check", `<b>Adjustment applied.</b> New balance ${fmt(acct.pointsBalance)} pts; tier recalculated: ${tierChange(t)}.`); })();
    A = { c: A.c, mode: "add", points: "", reason: "", note: "", result, fromHash: A.fromHash };
    render();
  });
}

// ---------------------------------------------------------------- UC-09 A3, Airline Management review
let R = { sel: undefined, msg: "", reason: "", bad: false };
function viewReviews() {
  if (!canReview()) return `<div class="head"><div><h1 class="small">Point reviews</h1></div></div>
    ${notice("neg", "lock", `<b>This page is for Airline Management.</b> Adjustments above ${fmt(D.seniorThreshold)} points are approved or rejected by a senior staff member (NFR-07).`, "alert")}`;
  const pending = D.adjustments.filter((a) => a.status === "PENDING").sort((a, b) => a.adjustedAt.localeCompare(b.adjustedAt));
  const reviewed = D.adjustments.filter((a) => a.reviewedBy).sort((a, b) => b.reviewedAt.localeCompare(a.reviewedAt));
  const recent = reviewed.filter((a) => a.reviewedAt.slice(0, 10) >= daysBefore(D.today, 30));
  if (R.sel === undefined || (R.sel && !pending.some((a) => a.adjustmentId === R.sel))) { R.sel = pending[0] ? pending[0].adjustmentId : null; R.reason = ""; R.bad = false; }
  const maxPts = 5000;
  const row = (a) => {
    const sel = a.adjustmentId === R.sel, c = cust(a.customerId), acct = accountOf(a.customerId);
    const after = acct.pointsBalance + a.points, w = Math.min(100, (Math.abs(a.points) / maxPts) * 100);
    return `<tr class="res go ${sel ? "sel" : ""}" data-adj="${a.adjustmentId}" aria-expanded="${sel}">
      <td class="two"><span class="semi">${c.fullName}</span><span class="sub code">${c.customerId} · ${a.adjustmentId}</span></td>
      <td>${a.adjustedAt.slice(0, 10)}</td><td>${a.reasonCode}</td>
      <td><div style="display:grid;grid-template-columns:64px 96px;align-items:center;gap:10px"><span class="semi" style="text-align:right">${signed(a.points)}</span>
        <div class="scale" aria-hidden="true"><div class="track"></div><div class="fill" style="left:0;width:${w}%;background:var(--amber)"></div><div class="limit" style="left:${(D.seniorThreshold / maxPts) * 100}%"></div></div></div></td>
      <td class="two"><span>${staffName(a.requestedBy)}</span><span class="sub code">${a.requestedBy}</span></td>
      <td class="r semi">${days(a.adjustedAt.slice(0, 10), D.today)}</td></tr>
    ${sel ? `<tr class="detail"><td colspan="6"><div class="detail-grid review-grid">
      <div><h3>Why</h3><p class="why">${esc(a.note)}</p></div>
      <div><h3>If approved</h3><dl class="kv"><dt>Balance</dt><dd>${fmt(acct.pointsBalance)} → <b>${fmt(after)} pts</b></dd><dt>Tier</dt><dd>${tierChange({ before: acct.tier, after: tierFor(after) })}</dd><dt>Account</dt><dd class="code">${acct.accountId}</dd></dl></div>
      <div class="f ${R.bad ? "bad" : ""}" id="fRj"><label for="rj">Reason for rejecting</label><textarea id="rj" class="ta" aria-describedby="eRj">${esc(R.reason)}</textarea><div class="err" id="eRj">A reason is required to reject an adjustment.</div></div>
      <div class="act"><button class="btn primary" type="button" data-approve="${a.adjustmentId}">${icon("check")}Approve</button><button class="btn" type="button" data-reject="${a.adjustmentId}">Reject</button>
        <a class="btn ghost" href="${to("loyalty", a.customerId)}">Open loyalty</a></div>
    </div></td></tr>` : ""}`;
  };
  return `
  <div class="head"><div><h1 class="small">Point adjustments to review</h1><p class="lede">Adjustments above ${fmt(D.seniorThreshold)} points wait here for Airline Management. The customer's balance changes only when you approve.</p></div></div>
  <div id="rmsg">${R.msg ? `<div class="gap">${R.msg}</div>` : ""}</div>
  <section class="figures" aria-label="Review queue">
    <div class="fig"><div class="n">${pending.length}</div><div class="l">Awaiting review</div><div class="s">${pending.length ? `Oldest waiting ${plural(days(pending[0].adjustedAt.slice(0, 10), D.today), "day")}` : "Queue is clear"}</div></div>
    <div class="fig"><div class="n">${fmt(pending.reduce((s, a) => s + a.points, 0))}</div><div class="l">Points awaiting</div><div class="s">${pending.length ? `Across ${plural(new Set(pending.map((a) => a.customerId)).size, "customer")}` : "Nothing pending"}</div></div>
    <div class="fig"><div class="n">${recent.filter((a) => a.status === "APPROVED").length}</div><div class="l">Approved</div><div class="s">Last 30 days</div></div>
    <div class="fig"><div class="n">${recent.filter((a) => a.status === "REJECTED").length}</div><div class="l">Rejected</div><div class="s">Last 30 days</div></div>
  </section>
  <section class="tt" style="margin-bottom:36px">
    <div class="tt-head"><h2>Awaiting review</h2><span class="meta">Oldest first · select one to decide</span></div>
    ${pending.length ? `<div class="wrap-x"><table class="rows results ${R.sel ? "has-sel" : ""}"><thead><tr><th style="width:24%">Customer</th><th>Requested</th><th>Reason code</th><th>Points</th><th>Requested by</th><th class="r">Days waiting</th></tr></thead>
      <tbody>${pending.map(row).join("")}</tbody></table></div>`
    : `<div class="empty"><h3>Nothing is waiting for review</h3><p class="muted">Adjustments above ${fmt(D.seniorThreshold)} points appear here when a CSR submits them.</p></div>`}
  </section>
  <section class="tt">
    <div class="tt-head"><h2>Reviewed</h2><span class="meta">Newest first</span></div>
    <div class="wrap-x"><table class="rows"><thead><tr><th>Reviewed</th><th>Adjustment</th><th>Customer</th><th class="r">Points</th><th>Requested by</th><th>Reviewed by</th><th>Reason</th><th class="r">Decision</th></tr></thead><tbody>
    ${reviewed.map((a) => `<tr><td class="semi">${a.reviewedAt.slice(0, 10)}</td><td class="code">${a.adjustmentId}</td><td><a class="link" href="${to("loyalty", a.customerId)}">${cust(a.customerId).fullName}</a></td>
      <td class="r semi">${signed(a.points)}</td><td>${staffName(a.requestedBy)}</td><td>${staffName(a.reviewedBy)}</td><td>${a.reviewNote ? clip(a.reviewNote, 240) : "—"}</td>
      <td class="r"><span class="tag ${ADJ[a.status][0]}">${ADJ[a.status][1]}</span></td></tr>`).join("")}
    </tbody></table></div>
  </section>`;
}
function bindReviews() {
  $$("tr[data-adj]").forEach((tr) => tr.addEventListener("click", () => { if (R.sel !== tr.dataset.adj) { R.sel = tr.dataset.adj; R.reason = ""; R.bad = false; R.msg = ""; render(); } }));
  const rj = $("#rj"); if (rj) rj.addEventListener("input", (e) => { R.reason = e.target.value; if (R.bad && R.reason.trim()) { R.bad = false; $("#fRj").classList.remove("bad"); } });
  const done = (a) => { a.reviewedBy = me.staffId; a.reviewedAt = `${D.today} ${clock()}`; R.sel = undefined; R.reason = ""; R.bad = false; };
  $$("[data-approve]").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const a = D.adjustments.find((x) => x.adjustmentId === b.dataset.approve), acct = accountOf(a.customerId);
    // approve(StaffAccount), then the flow continues at step 6: apply and recalculate the tier together
    const t = applyAdjustment(acct, a);
    a.status = "APPROVED"; done(a);
    R.msg = notice("info", "check", `<b><span class="code">${a.adjustmentId}</span> approved.</b> ${cust(a.customerId).fullName}'s balance is now ${fmt(acct.pointsBalance)} pts; tier ${tierChange(t)}.`);
    render();
  }));
  $$("[data-reject]").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!R.reason.trim()) { R.bad = true; $("#fRj").classList.add("bad"); $("#rj").setAttribute("aria-invalid", "true"); $("#rj").focus(); return; }
    const a = D.adjustments.find((x) => x.adjustmentId === b.dataset.reject);
    // reject(StaffAccount, String): the balance is unchanged
    a.status = "REJECTED"; a.reviewNote = R.reason.trim(); done(a);
    R.msg = notice("info", "check", `<b><span class="code">${a.adjustmentId}</span> rejected.</b> ${cust(a.customerId).fullName}'s balance is unchanged at ${fmt(accountOf(a.customerId).pointsBalance)} pts.`);
    render();
  }));
}

// ---------------------------------------------------------------- router
function resetViews() { S = { q: "Kheder", sel: "CUS-004182" }; A = null; R = { sel: undefined, msg: "", reason: "", bad: false }; }
const VIEWS = {
  login: [viewLogin, bindLogin], home: [viewHome], search: [viewSearch, bindSearch], overview: [viewOverview],
  history: [viewHistory, bindHistory], loyalty: [viewLoyalty, bindLoyalty], reviews: [viewReviews, bindReviews],
};
function render() {
  const raw = location.hash.slice(1), [route, qs] = raw.split("?"), params = new URLSearchParams(qs || "");
  // the precondition of every use case: an authenticated staff member with an active session (NFR-02)
  if (!me && route !== "login") { location.replace("#login" + (route ? "?next=" + encodeURIComponent("#" + raw) : "")); return; }
  if (me && (route === "login" || !VIEWS[route] || (route === "home" && isMgmt()))) { location.replace(homeRoute()); return; }
  document.body.classList.toggle("signed-out", !me);
  document.body.dataset.route = route;
  if (me) renderShell(route);
  const [view, bind] = VIEWS[route];
  const sheet = $("#sheet");
  sheet.innerHTML = view(params);
  sheet.classList.remove("view-enter"); void sheet.offsetWidth; sheet.classList.add("view-enter");
  window.scrollTo(0, 0);
  $$("tr[data-go]").forEach((tr) => tr.addEventListener("click", (e) => { if (!e.target.closest("a")) location.hash = tr.dataset.go; }));
  if (bind) bind(params);
  const at = $(".tabs a.active"); if (at) at.parentElement.scrollLeft = at.offsetLeft - 16;
  $$(".wrap-x").forEach((w) => { if (w.scrollWidth > w.clientWidth + 4) w.insertAdjacentHTML("afterend", '<p class="cue">Swipe sideways for more columns →</p>'); });
}
window.addEventListener("hashchange", render);
// controls outside the prototype's use cases are shown but do nothing
document.addEventListener("click", (e) => { if (e.target.closest('[aria-disabled="true"]')) e.preventDefault(); }, true);
document.addEventListener("keydown", (e) => { if (me && e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); location.hash = "#search"; } });
render();
