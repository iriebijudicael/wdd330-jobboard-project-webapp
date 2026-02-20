export default class ExternalServices {
  constructor() {
    this.apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    this.apiHost = import.meta.env.VITE_RAPIDAPI_HOST;
  }

  async getData(category = "Data Engineer") {
    // We use encodeURIComponent to handle spaces in titles like "Data Engineer"
    const url = `https://linkedin-job-search-api.p.rapidapi.com/active-jb-7d?limit=10&offset=0&title_filter=%22${encodeURIComponent(category)}%22&location_filter=%22United%20States%22&description_type=text`;
    
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': this.apiKey,
        'x-rapidapi-host': this.apiHost
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Fetch failed");
      
      const result = await response.json(); 
      console.log("API Result:", result); 

      // LinkedIn Job Search API usually returns an array directly 
      // or inside a 'data' property. Adjust based on your console.log:
      return Array.isArray(result) ? result : (result.data || []); 
    } catch (error) {
      console.error("API Error:", error);
      return [];
    }
  }
}