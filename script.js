const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  primaryNav.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

document.querySelector("#enquiry-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const fields = new FormData(form);
  const subject = `Project enquiry: ${fields.get("service")}`;
  const body = [
    `Name: ${fields.get("name")}`,
    `Phone: ${fields.get("phone")}`,
    `Service: ${fields.get("service")}`,
    "",
    "Project details:",
    fields.get("message") || "Not provided",
  ].join("\n");
  const mailto = `mailto:darconstruction657@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector("#form-status").textContent = "Opening your email app with this enquiry. Please review and send it there.";
  window.location.href = mailto;
});
