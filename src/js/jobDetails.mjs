// src/js/jobDetails.mjs
import { getParam, jobDetailsTemplate } from "./utils.mjs";

export default class JobDetails {
  constructor(dataSource) {
    this.dataSource = dataSource;
    this.jobId = getParam("id");
  }

  async init() {
    const container = document.querySelector(".job-detail-container");
    container.innerHTML = `<div class="loading"><div class="spinner"></div></div>`;

    try {
      const jobs = await this.dataSource.fetchAllJobs();
      const job = jobs.find(j => String(j.job_id) === String(this.jobId));

      if (job) {
        container.innerHTML = jobDetailsTemplate(job);
      } else {
        container.innerHTML = `<p class="error">Job not found.</p>`;
      }
    } catch (err) {
      container.innerHTML = `<p class="error">Could not load job details.</p>`;
    }
  }
}
