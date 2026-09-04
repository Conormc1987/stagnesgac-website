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

  @media (max-width:1040px) {
    body.menu-open { overflow:hidden; }
    .nav { min-height:68px; width:min(100% - 24px,var(--max)); gap:10px; }
    .nav .brand { position:relative; z-index:1002; font-size:.94rem; }
    .nav .crest { width:44px; height:44px; flex:0 0 44px; }
    .header-socials, .nav > .button { display:none !important; }
    .mobile-toggle { display:inline-flex !important; align-items:center; justify-content:center; position:relative; z-index:1002; width:auto; min-width:64px; height:42px; padding:0 14px; border-radius:999px; font-size:.82rem; font-weight:900; }
    .nav-links { position:fixed; inset:68px 0 0; z-index:1001; display:flex !important; flex-direction:column; align-items:stretch; gap:0; padding:18px 20px 42px; background:rgba(5,5,5,.985); overflow-y:auto; -webkit-overflow-scrolling:touch; transform:translateX(100%); opacity:0; visibility:hidden; transition:transform .24s ease,opacity .2s ease,visibility .2s; }
    .menu-open .nav-links { transform:translateX(0); opacity:1; visibility:visible; }
    .nav-links > a, .nav-links > div > a { display:block; width:100%; padding:14px 4px; border-bottom:1px solid rgba(255,255,255,.11); color:#fff; font-size:1.05rem; }
    .teams-menu, .about-menu, .development-menu { display:block; width:100%; }
    .teams-menu > a::after, .about-menu > a::after, .development-menu > a::after { content:"＋"; float:right; font-size:1.1rem; line-height:1; }
    .teams-menu.submenu-open > a::after, .about-menu.submenu-open > a::after, .development-menu.submenu-open > a::after { content:"−"; }
    .teams-dropdown, .about-dropdown, .development-dropdown { position:static; transform:none; min-width:0; width:100%; max-height:0; overflow:hidden; padding:0 0 0 16px; border:0; box-shadow:none; background:transparent; opacity:0; visibility:hidden; transition:max-height .24s ease,opacity .2s ease,padding .2s ease; }
    .teams-menu.submenu-open .teams-dropdown, .about-menu.submenu-open .about-dropdown, .development-menu.submenu-open .development-dropdown { max-height:480px; padding:4px 0 8px 16px; opacity:1; visibility:visible; }
    .teams-dropdown a, .about-dropdown a, .development-dropdown a { padding:10px 4px; color:rgba(255,255,255,.72) !important; white-space:normal; font-size:.92rem; }
    .split, .split.reverse { grid-template-columns:1fr; gap:30px; }
    .split.reverse > div:first-child { order:0; }
    .grid-4, .grid-5 { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .footer-grid { grid-template-columns:repeat(2,minmax(0,1fr)); row-gap:36px; }
    .gallery-grid { grid-template-columns:1fr 1fr; grid-template-rows:auto; }
    .gallery-item, .gallery-item:first-child { min-height:260px; grid-row:auto; }
    .update-panel { align-items:flex-start; flex-direction:column; }
  }

  @media (max-width:640px) {
    .container, .hero-inner, .page-hero-inner { width:calc(100% - 32px); }
    .page-hero { min-height:250px; }
    .page-hero-inner { padding:38px 0 32px; }
    section { padding:48px 0; }
    .hero { min-height:calc(82svh - 68px); }
    .hero.hero-home::before { background-position:58% center; }
    .hero-inner { padding:68px 0 42px; }
    .hero h1 { font-size:clamp(2.75rem,14vw,4.4rem); line-height:.92; }
    .page-hero h1 { font-size:clamp(2.55rem,13vw,4rem); line-height:.94; }
    .hero p, .page-hero p { margin-top:18px; font-size:1.02rem; line-height:1.55; }
    .section-title { font-size:clamp(2.15rem,11vw,3.35rem); line-height:1; }
    .section-copy { font-size:1rem; }
    .actions { gap:10px; margin-top:26px; }
    .actions .button { flex:1 1 100%; width:100%; }
    .grid-2, .grid-3, .grid-4, .grid-5, .sponsor-grid, .stat-row { grid-template-columns:1fr; }
    .card-body { padding:21px; }
    .card-media { min-height:210px; }
    .media { min-height:300px; }
    .fixture { grid-template-columns:66px 1fr; gap:14px; padding:16px; }
    .fixture > :last-child { grid-column:2; }
    .gallery-grid { grid-template-columns:1fr; }
    .gallery-item, .gallery-item:first-child { min-height:220px; }
    .footer-grid { grid-template-columns:1fr; row-gap:28px; column-gap:0; }
    .footer-bottom { flex-direction:column; gap:8px; }
    .site-footer { padding-top:42px; }
    .eyebrow { font-size:.7rem; }
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
    dropdown.innerHTML = '<a class="menu-overview" href="about.html">About Overview</a><a href="history.html">History of St Agnes GAC</a><a href="roll-of-honour.html">Roll of Honour</a>';
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
    developmentDropdown.innerHTML = '<a class="menu-overview" href="st-agnes-2030.html">St Agnes 2030 Overview</a><a href="st-agnes-2030.html#future">Future of Our Club</a><a href="st-agnes-2030.html#south-link">South Link Development</a><a href="st-agnes-2030.html#development-plan">Club Development Plan</a><a href="st-agnes-2030.html#support">How to Support</a>';
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
    dropdown.innerHTML = '<a class="menu-overview" href="teams.html">All Teams</a><a href="mens-senior-football.html">Men\'s Senior Football</a><a href="gaelic-for-mothers.html">Gaelic for Mothers &amp; Others</a><a href="senior-hurling.html">Men\'s Senior Hurling</a><a href="juveniles.html">Juveniles</a>';
    wrapper.appendChild(dropdown);
  }
});


const mobileMenuGroups = [...document.querySelectorAll(".about-menu, .development-menu, .teams-menu")];

const closeMobileSubmenus = (except = null) => {
  mobileMenuGroups.forEach((group) => {
    if (group === except) return;
    group.classList.remove("submenu-open");
    const heading = group.querySelector(":scope > a");
    if (heading) heading.setAttribute("aria-expanded", "false");
  });
};

mobileMenuGroups.forEach((group, index) => {
  const heading = group.querySelector(":scope > a");
  const dropdown = group.querySelector(":scope > div");
  if (!heading || !dropdown) return;
  dropdown.id = dropdown.id || `mobile-submenu-${index + 1}`;
  heading.setAttribute("aria-controls", dropdown.id);
  heading.setAttribute("aria-expanded", "false");
  heading.addEventListener("click", (event) => {
    if (window.innerWidth > 1040) return;
    event.preventDefault();
    const willOpen = !group.classList.contains("submenu-open");
    closeMobileSubmenus(group);
    group.classList.toggle("submenu-open", willOpen);
    heading.setAttribute("aria-expanded", String(willOpen));
  });
});

if (toggle) {
  const mobileNav = document.querySelector(".nav-links");
  toggle.setAttribute("aria-expanded", "false");
  if (mobileNav) {
    mobileNav.id = mobileNav.id || "site-navigation";
    toggle.setAttribute("aria-controls", mobileNav.id);
  }

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    toggle.textContent = "Menu";
    closeMobileSubmenus();
  };

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    toggle.textContent = isOpen ? "Close" : "Menu";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1040) closeMenu();
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

const anniversaryClubPhoto = document.querySelector('[data-label="75 years of St Agnes pride"]');
if (anniversaryClubPhoto) {
  anniversaryClubPhoto.style.backgroundImage = 'url("assets/senior-football-team-2026.jpg")';
  anniversaryClubPhoto.style.backgroundSize = "cover";
  anniversaryClubPhoto.style.backgroundPosition = "center";
  anniversaryClubPhoto.style.backgroundRepeat = "no-repeat";
  anniversaryClubPhoto.setAttribute("role", "img");
  anniversaryClubPhoto.setAttribute("aria-label", "St Agnes GAC club team photo");
}
