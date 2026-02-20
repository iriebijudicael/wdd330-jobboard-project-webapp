export default class JobModel {
  constructor(category) {
    this.category = category;
    this.baseUrl = 'https://linkedin-job-search-api.p.rapidapi.com/active-jb-7d';
  }

  async fetchAllJobs() {
    // Accessing env variables (Syntax depends on your build tool, e.g., Vite)
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

    const url = `${this.baseUrl}?limit=10&offset=0&title_filter="${encodeURIComponent(this.category || "Data Engineer")}"&location_filter="United States"&description_type=text`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Navigate the API response structure. 
      // Usually, RapidAPI results are nested in a 'data' or 'results' property.
      return data.jobs || data.results || data; 
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      return []; // Return empty array so the app doesn't crash
    }
  }
}