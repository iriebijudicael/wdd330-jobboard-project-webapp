export function jobCardTemplate(job) {
  return `
    <div class="job-card" data-id="${job.id}">
      <div class="job-header">
        <div class="company-logo">
          <span class="logo-placeholder">${job.company.split(' ').map(w=>w[0]).join('').toUpperCase()}</span>
        </div>
        <div>
          <h3 class="job-title">${job.title}</h3>
          <div class="company-name">${job.company}</div>
        </div>
        <div class="job-date">${job.datePosted}</div>
      </div>
      <div class="job-meta">
        <div class="salary">${job.salary}</div>
        <div class="location">${job.location}</div>
        <div class="type">${job.type}</div>
      </div>
    </div>
  `;
}