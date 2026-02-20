// wrapper for querySelector
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage (e.g., saved jobs)
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Universal click/touch listener
export function setClick(selector, callback) {
  const element = qs(selector);
  if (element) {
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  }
}

// Updated: Renamed from getParam to be generic for jobs/categories
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Render a list of items (Jobs) using a template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  // If list is empty, you might want to show a "No jobs found" message
  if (!list || list.length === 0) {
     return; 
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", templateFn);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// Adapted for Job Board (Header/Footer)
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const header = qs("#header");
  const footer = qs("#footer");

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);

  // Initialize Job Search logic
  initJobSearch();
  // Update saved jobs count (instead of cart)
  updateSavedJobsBadge();
}

function initJobSearch() {
  const sButton = document.getElementById("searchButton");
  const sInput = document.getElementById("searchInput");
  
  if (sButton && sInput) {
    sButton.addEventListener("click", () => {
      performJobSearch(sInput.value);
    });
  }
}

// Adapted: Navigates to job listing with search term
export function performJobSearch(term) {
  const searchParams = new URLSearchParams();
  searchParams.append("category", term);
  
  // Adjusted path to point to job_listing
  window.location.href = `/job_listing/index.html?${searchParams.toString()}`;
}

// Adapted: Changed from "cart" to "saved-jobs"
export function updateSavedJobsBadge() {
  const badge = qs(".saved-jobs-count");
  if (!badge) return;

  const savedJobs = getLocalStorage("saved-jobs") || [];
  const count = savedJobs.length;

  if (count === 0) {
    badge.classList.add("hide");
  } else {
    badge.classList.remove("hide");
    badge.textContent = count;
  }
}