// import "remixicon/fonts/remixicon.css";
import { renderJobList } from "./modules/JobList.mjs";
import { renderSidebar, setupFilters } from "./modules/SearchFilter.mjs";

async function loadPartials() {
  const header = await fetch("partials/header.html").then((r) => r.text());
  const footer = await fetch("partials/footer.html").then((r) => r.text());
  document.getElementById("header").innerHTML = header;
  document.getElementById("footer").innerHTML = footer;
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadPartials();
  renderSidebar();
  renderJobList();
  setupFilters();
});
