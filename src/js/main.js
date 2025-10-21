import { fetchJobs } from './utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  const jobs = await fetchJobs();
  const container = document.querySelector('#jobList');

  jobs.forEach(job => {
    const card = document.createElement('div');
    card.classList.add('job-card');
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>${job.company}</strong> — ${job.location}</p>
      <p><em>${job.type}</em> | ${job.salary}</p>
      <p>${job.description}</p>
      <a href="${job.applyUrl}" target="_blank" class="apply-btn">Apply Now</a>
    `;
    container.appendChild(card);
  });
});
