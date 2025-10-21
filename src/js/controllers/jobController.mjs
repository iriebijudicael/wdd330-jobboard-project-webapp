// src/js/controllers/JobController.mjs
import { JobAPI } from '../services/apiService.mjs';
import { JobView } from '../views/jobCardView.mjs';

export class JobController {
  constructor() {
    this.jobView = new JobView();
    this.initListeners();
  }

  initListeners() {
    const form = document.getElementById('hero-search');
    const jobType = document.getElementById('jobTypeFilter');
    const experience = document.getElementById('experienceFilter');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = document.getElementById('searchTitle').value.trim();
      const location = document.getElementById('searchLocation').value.trim();
      this.loadJobs(query, { location });
    });

    [jobType, experience].forEach((filter) =>
      filter.addEventListener('change', () => {
        const query = document.getElementById('searchTitle').value.trim();
        const location = document.getElementById('searchLocation').value.trim();
        this.loadJobs(query, {
          location,
          type: jobType.value,
          experience: experience.value
        });
      })
    );
  }

  async loadJobs(query = '', filters = {}) {
    this.jobView.showLoading();

    try {
      const jobs = await JobAPI.fetchJobsFromServer(query, filters);
      this.jobView.renderJobs(jobs);
    } catch (error) {
      this.jobView.showError('Failed to load jobs. Please try again later.');
    } finally {
      this.jobView.hideLoading();
    }
  }
}
