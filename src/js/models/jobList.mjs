const API_URL = "http://localhost:3000/api/jobs";

export async function fetchJobs(query = "", filters = {}) {
  try {
    const params = new URLSearchParams({
      q: query,
      location: filters.location || "",
      type: filters.type || "all",
      experience: filters.experience || "all"
    });

    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (err) {
    throw new Error("Failed to load jobs. Please try again later.");
  }
}


// export function filterJobs(jobs, category, location) {
//   return jobs.filter(job => {
