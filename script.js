const toggle = document.querySelector(".mobile-toggle");

const compactLayoutStyles = document.createElement("style");
compactLayoutStyles.textContent = `
  .page-hero { min-height: 320px; }
  .page-hero-inner { padding: 52px 0 44px; }
  section { padding: 64px 0; }
  .split, .split.reverse { gap: 48px; }
  .senior-football-photo, .senior-hurling-photo { filter: none !important; }
  .teams-menu, .about-menu, .development-menu { position: relative; display: inline-flex; align-items: center; }
  .teams-menu > a::after, .about-menu > a::after, .development-menu > a::after { content: " ▾"; font-size: .72em; }
  .teams-dropdown, .about-dropdown, .development-dropdown { position:absolute; top:100%; left:50%; transform:translateX(-50%); min-width:250px; padding:10px; border-radius:12px; background:#111; border:1px solid rgba(212,175,55,.45); box-shadow:0 18px 45px rgba(0,0,0,.28); opacity:0; visibility:hidden; z-index:1000; }
  .teams-menu:hover .teams-dropdown, .teams-menu:focus-within .teams-dropdown, .about-menu:hover .about-dropdown, .about-menu:focus-within .about-dropdown, .development-menu:hover .development-dropdown, .development-menu:focus-within .development-dropdown { opacity:1; visibility:visible; }
  .teams-dropdown a, .about-dropdown a, .development-dropdown a { display:block; padding:11px 13px; border-radius:8px; color:#fff !important; white-space:nowrap; text-decoration:none; }
  .teams-dropdown a:hover, .teams-dropdown a:focus, .about-dropdown a:hover, .about-dropdown a:focus, .development-dropdown a:hover, .development-dropdown a:focus { background:rgba(212,175,55,.16); color:#d4af37 !important; }
  @media (max-width:900px) {
    .teams-menu, .about-menu, .development-menu { display:block; }
    .teams-menu > a::after, .about-menu > a::after, .development-menu > a::after { content:""; }
    .teams-dropdown, .about-dropdown, .development-dropdown { position:static; transform:none; min-width:0; padding:4px 0 4px 16px; border:0; box-shadow:none; background:transparent; opacity:1; visibility:visible; }
    .teams-dropdown a, .about-dropdown a, .development-dropdown a { padding:8px 0; }
  }
  @media (max-width:640px) {
    .page-hero { min-height: 280px; }
    .page-hero-inner { padding: 40px 0 34px; }
    section { padding: 52px 0; }
  }
`;
document.head.appendChild(compactLayoutStyles);

document.querySelectorAll(".nav-links").forEach((nav) => {
  const about = nav.querySelector('a[href="about.html"]');
  const news = nav.querySelector('a[href="news.html"]');
  if (news) news.textContent = "Latest News";
  if (about && news) about.insertAdjacentElement("afterend", news);

  if (about && !about.closest(".about-menu")) {
    const wrapper = document.createElement("div");
    wrapper.className = "about-menu";
    about.parentNode.insertBefore(wrapper, about);
    wrapper.appendChild(about);
    const dropdown = document.createElement("div");
    dropdown.className = "about-dropdown";
    dropdown.innerHTML = '<a href="history.html">History of St Agnes GAC</a><a href="roll-of-honour.html">Roll of Honour</a>';
    wrapper.appendChild(dropdown);
  }

  if (!nav.querySelector('.development-menu')) {
    const developmentWrapper = document.createElement("div");
    developmentWrapper.className = "development-menu";
    const developmentLink = document.createElement("a");
    developmentLink.href = "st-agnes-2030.html";
    developmentLink.textContent = "St Agnes 2030";
    developmentWrapper.appendChild(developmentLink);
    const developmentDropdown = document.createElement("div");
    developmentDropdown.className = "development-dropdown";
    developmentDropdown.innerHTML = '<a href="st-agnes-2030.html#future">Future of Our Club</a><a href="st-agnes-2030.html#south-link">South Link Development</a><a href="st-agnes-2030.html#development-plan">Club Development Plan</a><a href="st-agnes-2030.html#support">How to Support</a>';
    developmentWrapper.appendChild(developmentDropdown);
    if (news) news.insertAdjacentElement("afterend", developmentWrapper);
    else if (about) about.closest('.about-menu').insertAdjacentElement("afterend", developmentWrapper);
    else nav.prepend(developmentWrapper);
  }

  const teamsLink = nav.querySelector('a[href="teams.html"]');
  if (teamsLink && !teamsLink.closest(".teams-menu")) {
    const wrapper = document.createElement("div");
    wrapper.className = "teams-menu";
    teamsLink.parentNode.insertBefore(wrapper, teamsLink);
    wrapper.appendChild(teamsLink);
    const dropdown = document.createElement("div");
    dropdown.className = "teams-dropdown";
    dropdown.innerHTML = '<a href="mens-senior-football.html">Men\'s Senior Football</a><a href="gaelic-for-mothers.html">Gaelic for Mothers &amp; Others</a><a href="senior-hurling.html">Men\'s Senior Hurling</a><a href="juveniles.html">Juveniles</a>';
    wrapper.appendChild(dropdown);
  }
});

if (toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "Close" : "Menu";
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const teamPages = ["mens-senior-football.html", "gaelic-for-mothers.html", "senior-hurling.html", "juveniles.html"];
const aboutPages = ["history.html", "roll-of-honour.html"];
const developmentPages = ["st-agnes-2030.html"];

document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) link.setAttribute("aria-current", "page");
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    }
  });
});

if (teamPages.includes(currentPage)) {
  document.querySelectorAll('.nav-links a[href="teams.html"]').forEach((link) => link.setAttribute("aria-current", "page"));
}
if (aboutPages.includes(currentPage)) {
  document.querySelectorAll('.nav-links a[href="about.html"]').forEach((link) => link.setAttribute("aria-current", "page"));
}
if (developmentPages.includes(currentPage)) {
  document.querySelectorAll('.nav-links a[href="st-agnes-2030.html"]').forEach((link) => link.setAttribute("aria-current", "page"));
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const recipient = contactForm.dataset.email;
    const reason = data.get("reason");
    const subject = `Website enquiry: ${reason}`;
    const body = [`Name: ${data.get("name")}`, `Email: ${data.get("email")}`, `Reason: ${reason}`, "", data.get("message")].join("\n");
    const note = document.querySelector("#form-note");
    if (note) note.textContent = "Your email app is opening. Please press Send to complete your enquiry.";
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
