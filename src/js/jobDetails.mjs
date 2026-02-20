import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

export default class JobDetails {
  constructor(jobId, dataSource) {
    this.jobId = jobId;
    this.job = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Use your JobDataService to get specific info
    this.job = await this.dataSource.findJobById(this.jobId);
    this.renderJobDetails("main");
    
    // Add listener to the 'Save Job' button
    qs("#saveJob").addEventListener("click", this.saveJob.bind(this));
  }

  saveJob() {
    let savedJobs = getLocalStorage("saved-jobs") || [];
    // Prevent duplicates
    if (!savedJobs.find(j => j.id === this.job.id)) {
      savedJobs.push(this.job);
      setLocalStorage("saved-jobs", savedJobs);
      alert("Job saved to your profile!");
    }
  }

  renderJobDetails(selector) {
    const element = qs(selector);
    element.innerHTML = `
      <section class="job-detail">
        <h3>${this.job.company}</h3>
        <h1>${this.job.title}</h1>
        <p class="job-location">${this.job.location}</p>
        <button id="saveJob" data-id="${this.job.id}">Save Job</button>
        <hr>
        <div class="job-description">${this.job.description}</div>
        <a href="../apply/index.html?id=${this.job.id}" class="apply-button">Apply Now</a>
      </section>`;
  }
}