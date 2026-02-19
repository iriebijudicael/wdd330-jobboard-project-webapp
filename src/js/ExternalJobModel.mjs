export default class ExternalJobModel {
  constructor() {
    this.baseUrl = "/.netlify/functions/fetchJobs";
  }

  async fetchAllJobs(query = "java", location = "Worldwide") {
    try {
      const response = await fetch(
        `${this.baseUrl}?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`
      );

      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Model Error:", error);
      return [];
    }
  }
}
