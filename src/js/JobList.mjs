import { renderListWithTemplate, qs } from "./utils.mjs";

export default class JobList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.fetchAllJobs(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(this.jobTemplate, this.listElement, list, "afterbegin", true);
  }

  jobTemplate(job) {
  return `
    <li class="job-card">
      <h2 class="job-title">${job.job_title || job.title}</h2>
      <p class="company">${job.company_name || job.company}</p>
      <p class="location">${job.location}</p>
      <a href="${job.job_apply_link}" target="_blank">View Original Post</a>
    </li>`;
}
}