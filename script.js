const toggle = document.querySelector(".mobile-toggle");

// Apply a tighter, more consistent vertical rhythm across the whole website.
const compactLayoutStyles = document.createElement("style");
compactLayoutStyles.textContent = `
  .page-hero {
    min-height: 320px;
  }

  .page-hero-inner {
    padding: 52px 0 44px;
  }

  section {
    padding: 64px 0;
  }

  .split,
  .split.reverse {
    gap: 48px;
  }

  @media (max-width: 640px) {
    .page-hero {
      min-height: 280px;
    }

    .page-hero-inner {
      padding: 40px 0 34px;
    }

    section {
      padding: 52px 0;
    }
  }
`;
document.head.appendChild(compactLayoutStyles);

// Keep the main navigation consistent across every page.
document.querySelectorAll(".nav-links").forEach((nav) => {
  const about = nav.querySelector('a[href="about.html"]');
  const news = nav.querySelector('a[href="news.html"]');
  if (news) news.textContent = "Latest News";
  if (about && news) about.insertAdjacentElement("afterend", news);
});

if (toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "Close" : "Menu";
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

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

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const recipient = contactForm.dataset.email;
    const reason = data.get("reason");
    const subject = `Website enquiry: ${reason}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Reason: ${reason}`,
      "",
      data.get("message"),
    ].join("\n");

    const note = document.querySelector("#form-note");
    if (note) note.textContent = "Your email app is opening. Please press Send to complete your enquiry.";
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
