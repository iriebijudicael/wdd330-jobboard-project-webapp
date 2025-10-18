// JobModel.mjs
import * as Api from '../services/apiService.mjs';

export class JobModel {
  // get jobs from backend with optional search & filters
  async getJobs(query = '', filters = {}) {
    return await Api.fetchJobsFromServer(query, filters);
  }

  async createJob(jobPayload) {
    return await Api.postJobToServer(jobPayload);
  }
}
