import { loadHeaderFooter } from "./utils.mjs";
import ApplicationProcess from "./ApplicationProcess.mjs";

loadHeaderFooter();

const apply = new ApplicationProcess("saved-jobs", ".application-summary");
apply.init();

document.forms["application-form"].addEventListener("submit", (e) => {
  e.preventDefault();
  // Logic to send resume/data to your backend
  console.log("Application Submitted!");
});