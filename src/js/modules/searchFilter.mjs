import { renderJobList } from "./JobList.mjs";

export function renderSidebar() {
  document.getElementById("sidebar").innerHTML = `
    <input type="text" id="search-input" placeholder="Search jobs..." />
    <select id="type-filter">
      <option value="">All Types</option>
      <option value="Full Time">Full Time</option>
      <option value="Part Time">Part Time</option>
      <option value="Contract">Contract</option>
      <option value="Internship">Internship</option>
    </select>
    <button id="filter-btn">Filter</button>
  `;
}

export function setupFilters() {
  document.getElementById("filter-btn").onclick = () => {
    const type = document.getElementById("type-filter").value;
    renderJobList({ type });
  };
  document.getElementById("search-input").oninput = (e) => {
    const search = e.target.value;
    renderJobList({ search });
  };
}