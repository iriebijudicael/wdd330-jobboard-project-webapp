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
        <header class="job-header">
          <div class="company-logo" aria-hidden="true">
            ${job.flagUrl ? `<img src="${job.flagUrl}" alt="${job.company_name} flag">` : '<div class="logo-placeholder">J</div>'}
          </div>
          <div class="job-info">
            <h3 class="job-title">${escapeHtml(job.title)}</h3>
            <p class="company-name">${escapeHtml(job.company_name)}</p>
            <p class="meta">${escapeHtml(job.location)} • ${escapeHtml(job.job_type)} • ${escapeHtml(job.experience_level)}</p>
          </div>
          <div class="job-badges">
            ${job.temp ? `<span class="badge">🌡 ${Math.round(job.temp)}°C</span>` : ''}
            <span class="salary">${escapeHtml(job.salary || '')}</span>
          </div>
        </header>
        <p class="job-desc">${escapeHtml(job.description || '').slice(0,220)}...</p>
        <footer class="job-footer">
          <a class="apply-btn" href="#" data-id="${job.id}">Apply</a>
        </footer>
      `;
      this.container.appendChild(card);
    });
  }
}

/* small helper to avoid/invalidate injection when rendering text */
function escapeHtml(text='') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}
