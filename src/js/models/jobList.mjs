const API_URL = 'http://localhost:3000/api/jobs';

export async function fetchJobs(query = '', filters = {}) {
  try {
    // Ensure filters is an object even if null/undefined is passed explicitly
    filters = filters || {};

    const params = new URLSearchParams({
      q: query,
      location: filters.location || '',
      type: filters.type || 'all',
      experience: filters.experience || 'all'
    });

    const response = await fetch(`${API_URL}?${params.toString()}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (err) {
    // include original error message for easier debugging
    throw new Error(`Failed to load jobs. ${err && err.message ? err.message : 'Please try again later.'}`);
  }
}

