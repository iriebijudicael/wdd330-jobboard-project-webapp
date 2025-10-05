import { jobCardTemplate } from "../templates/jobCardTemplate.mjs";
import { jobDetailTemplate } from "../templates/jobDetailTemplate.mjs";

let jobs = [];

export async function renderJobList(filter = {}) {
  if (!jobs.length) {
    jobs = await fetch("data/mock-jobs.json").then(r => r.json());
  }
  let filteredJobs = jobs;
  // Apply filters here if needed
  const jobList = document.getElementById("job-list");
  jobList.innerHTML = filteredJobs.map(jobCardTemplate).join('');
  jobList.querySelectorAll(".job-card").forEach(card => {
    card.onclick = () => showJobDetail(card.dataset.id);
  });
}

function showJobDetail(id) {
  const job = jobs.find(j => j.id == id);
  document.getElementById("job-detail").innerHTML = jobDetailTemplate(job);
  document.getElementById("close-detail").onclick = () => {
    document.getElementById("job-detail").innerHTML = '';
  };
}