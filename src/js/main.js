// main.js
import { JobController } from './controllers/jobController.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const jobListEl = document.getElementById('jobList');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('errorMessage');

  const jobController = new JobController({ jobListEl, loadingEl, errorEl });

  // initial load
  jobController.loadAndRender();

  // search form
  const searchForm = document.getElementById('hero-search');
  const searchTitle = document.getElementById('searchTitle');
  const searchLocation = document.getElementById('searchLocation');
  const jobType = document.getElementById('jobTypeFilter');
  const experience = document.getElementById('experienceFilter');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const filters = {
      type: jobType.value,
      experience: experience.value,
      location: searchLocation.value
    };
    jobController.loadAndRender(searchTitle.value, filters);
    document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' });
  });

  // optionally: make filter changes reactive
  jobType.addEventListener('change', () => {
    const filters = { type: jobType.value, experience: experience.value, location: searchLocation.value };
    jobController.loadAndRender(searchTitle.value, filters);
  });
});
