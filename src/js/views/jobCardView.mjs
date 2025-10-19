// JobView.mjs
export class JobView {
  constructor(containerEl, loadingEl, errorEl) {
    this.container = containerEl;
    this.loading = loadingEl;
    this.error = errorEl;
  }

  renderLoading(show = true) {
    this.loading.hidden = !show;
  }

  renderError(msg) {
    if (!msg) { this.error.hidden = true; return; }
    this.error.textContent = msg;
    this.error.hidden = false;
  }

  // jobs enriched by controller (flagUrl, temp)
  renderJobs(jobs) {
    this.container.innerHTML = '';
    if (!jobs.length) {
      this.container.innerHTML = '<p class="no-results">No jobs found.</p>';
      return;
    }

    jobs.forEach(job => {
      const card = document.createElement('article');
      card.className = 'job-card animate-card';
      card.tabIndex = 0; // keyboard focusable
      card.innerHTML = `
        <div class="job-header">
        <div>
          <h3 class="job-title">${job.title}</h3>
          <div class="company-name">${job.company}</div>
        </div>
        <div class="job-date">${job.posted}</div>
      </div>
      <div class="job-meta">
        <div class="meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2v-3H6v-2h2V9l2-2h2l2 2v2h2v2h-2v3l-2 2v1h-2v-1zm2.5-6.5c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5S10.62 13 12 13s2.5-1.12 2.5-2.5z"/>
          </svg>
          ${job.salary}
        </div>
        <div class="job-level">
          ${job.experienceLevel}
        </div>
        <div class="meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          ${job.location}
        </div>
        <div class="meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h2.5L18 6.5 19.5 8 21 9.5V12h-2v-2.5L17.5 8 16 6.5 14.5 5V3h2z"/>
          </svg>
          ${job.type}
        </div>
      </div>
      `;
      this.container.appendChild(card);
    });
  }
}

/* small helper to avoid/invalidate injection when rendering text */
// function escapeHtml(text='') {
//   return String(text)
//     .replace(/&/g, '&amp;')
//     .replace(/</g,'&lt;')
//     .replace(/>/g,'&gt;')
//     .replace(/"/g,'&quot;');
// }
