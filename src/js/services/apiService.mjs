// /js/models/ApiService.mjs
const API = 'https://jsonplaceholder.typicode.com/posts';
// const API = 'POST https://api.cloudconvert.com/v2/jobs';

export async function fetchJobsFromServer(query = '', filters = {}) {
  const res = await fetch(API);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  const jobs = await res.json();

  // Filter locally since mock-jobs.json is static
  return jobs.filter(job => {
    const matchKeyword =
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.description.toLowerCase().includes(query.toLowerCase());

    const matchLocation =
      !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchType =
      filters.type === 'all' || job.type.toLowerCase() === filters.type.toLowerCase();

    const matchExperience =
      filters.experience === 'all' ||
      (job.experience && job.experience.toLowerCase().includes(filters.experience.toLowerCase()));

    return matchKeyword && matchLocation && matchType && matchExperience;
  });
}
