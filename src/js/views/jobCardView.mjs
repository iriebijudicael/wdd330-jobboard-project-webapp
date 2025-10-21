// src/js/views/JobView.mjs
export class JobView {
  constructor() {
    this.jobList = document.getElementById('jobList');
    this.loadingEl = document.getElementById('loading');
    this.errorEl = document.getElementById('errorMessage');
  }

  showLoading() {
    this.loadingEl.hidden = false;
    this.errorEl.hidden = true;
    this.jobList.innerHTML = '';
  }

  hideLoading() {
    this.loadingEl.hidden = true;
  }

  showError(message) {
    this.errorEl.textContent = message;
    this.errorEl.hidden = false;
  }

  renderJobs(jobs) {
    if (!jobs || jobs.length === 0) {
      this.jobList.innerHTML = '<p class="no-jobs">No jobs found.</p>';
      return;
    }

    this.jobList.innerHTML = jobs
      .map(
        (job) => `
        <article class="job-card">
          <h3>${job.title}</h3>
          <p class="company">${job.company_name || job.organization || 'N/A'}</p>
          <p class="location">${job.location || 'Remote'}</p>
          <a href="${job.job_url || job.linkedin_url || '#'}" target="_blank" class="apply-btn">View Job</a>
        </article>
      `
      )
      .join('');
  }
}
