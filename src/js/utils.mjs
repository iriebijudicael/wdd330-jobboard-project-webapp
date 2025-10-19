// // // wrapper for querySelector...returns matching element
// // export function qs(selector, parent = document) {
// //   return parent.querySelector(selector);
// // }
// // // or a more concise version if you are into that sort of thing:
// // // export const qs = (selector, parent = document) => parent.querySelector(selector);

// // // retrieve data from localstorage
// // export function getLocalStorage(key) {
// //   return JSON.parse(localStorage.getItem(key));
// // }
// // // save data to local storage
// // export function setLocalStorage(key, data) {
// //   localStorage.setItem(key, JSON.stringify(data));
// // }
// // // set a listener for both touchend and click
// // export function setClick(selector, callback) {
// //   qs(selector).addEventListener("touchend", (event) => {
// //     event.preventDefault();
// //     callback();
// //   });
// //   qs(selector).addEventListener("click", callback);
// // }

// // export function formatDate(dateStr) {
// //   const date = new Date(dateStr);
// //   return date.toLocaleDateString();
// // }



// import { fetchJobs, filterJobs } from "models/jobList.mjs";
// import { 
//   displayJobs, 
//   showError, 
//   hideError, 
//   showLoading, 
//   hideLoading 
// } from "models/jobFilter.mjs";
// import { renderJobList } from "./models/jobList.mjs";
// import { jobDetailTemplate } from "./models/jobDetail.mjs";

// export async function handleLoadJobs(
//   jobListEl, 
//   errorEl, 
//   loadingEl, 
//   categoryFilter, 
//   locationFilter
// ) {
//   showLoading(loadingEl);
//   hideError(errorEl);

//   try {
//     const jobs = await fetchJobs();
//     const filtered = filterJobs(jobs, categoryFilter.value, locationFilter.value);
//     displayJobs(filtered, jobListEl);
//   } catch (error) {
//     showError(errorEl, error.message);
//   } finally {
//     hideLoading(loadingEl);
//   }
// }

// export function handleClearJobs(jobListEl, errorEl) {
//   jobListEl.innerHTML = '';
//   hideError(errorEl);
// }
