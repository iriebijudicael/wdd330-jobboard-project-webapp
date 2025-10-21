// models/JobList.mjs
import { fetchJobsFromLinkedIn } from '../services/apiService.mjs';

export class JobList {
  constructor() {
    this.jobs = [];
  }

  async loadJobs(query = '', location = 'Remote') {
    try {
      const data = await fetchJobsFromLinkedIn(query, location);
      this.jobs = data;
      return data;
    } catch (err) {
      console.error('Error loading jobs:', err);
      throw err;
    }
  }
}
