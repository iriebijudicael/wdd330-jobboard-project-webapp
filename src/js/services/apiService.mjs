const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/jobs'
    : 'https://your-deployed-api-domain.com/api/jobs';

export async function fetchJobsFromServer(query = '', filters = {}) {
  const params = new URLSearchParams({
    q: query || '',
    location: filters.location || '',
    type: filters.type || 'all',
    experience: filters.experience || 'all',
  });

  const res = await fetch(`${API_BASE_URL}?${params}`);
  if (!res.ok) throw new Error('Failed to fetch jobs from API');
  return res.json();
}

export async function postJobToServer(jobData) {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData),
  });
  if (!res.ok) throw new Error('Failed to post job');
  return res.json();
}
