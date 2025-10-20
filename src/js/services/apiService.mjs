// ApiService.mjs
const API = './data/mock-jobs.json';

export async function fetchJobsFromServer(query = '', filters = {}) {
  const params = new URLSearchParams({
    q: query || '',
    location: filters.location || '',
    type: filters.type || 'all',
    experience: filters.experience || 'all'
  });
  const res = await fetch(`${API}?${params}`);
  if (!res.ok) throw new Error('Failed to fetch jobs from API');
  return res.json();
}
