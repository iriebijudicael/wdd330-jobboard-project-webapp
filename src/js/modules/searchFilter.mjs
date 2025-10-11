import { renderJobList } from "./jobList.mjs";

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




// // Convert the category items into an array (if not already)
// const displayItems = Array.from(category);

// // Get the container element where we’ll insert the HTML
// const rootElement = document.getElementById('root');

// // Initialize an empty string to build our HTML content
// let htmlString = '';

// // Loop through each item in the category
// displayItems.forEach(item => {
//   // Destructure the item object for cleaner access
//   const { index, image, title, rate, av } = item;

//   // Create a div element for this job/card
//   const listItem = document.createElement('div');
//   listItem.className = 'list'; // Add CSS class

//   // Build the inner HTML for this item using template literals
//   const itemHTML = `
//     <img src="${image}" alt="${title}" />
//     <h3>${title}</h3>
//     <p>Rate: $${rate}</p>
//     <span id="key">${av}</span>
//   `;

//   // Set the inner HTML of the list item
//   listItem.innerHTML = itemHTML;

//   // Append this item to the root element
//   rootElement.appendChild(listItem);
// });