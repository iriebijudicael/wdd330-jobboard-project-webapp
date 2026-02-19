// src/js/LocalJobModel.mjs
export default class LocalJobModel {
  constructor(path) {
    this.path = path; // e.g., "src/data/jobs.json"
  }

  async fetchLocalJobs() {
    try {
      const response = await fetch(this.path);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to load local job data.");
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}