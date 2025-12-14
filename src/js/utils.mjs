// src/js/utils.mjs
export async function fetchJobs() {
  try {
    const response = await fetch('./json/mock-jobs.json');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    // ensure each job has an id (if your mock has no id)
    return data.map((job, i) => ({
      id: job.id ?? `api-${i}`,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary ?? 'Not specified',
      description: job.description ?? '',
      applyUrl: job.applyUrl ?? job.url ?? '#'
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

// helper to merge API + local posted jobs
export async function getAllJobs() {
  const apiJobs = await fetchJobs();
  const posted = JSON.parse(localStorage.getItem('postJob') || '[]');
  // ensure posted jobs have ids
  const normalizedPosted = posted.map((j, i) => ({
    id: j.id ?? `local-${Date.now()}-${i}`,
    ...j
  }));
  // store normalized back in case ids missing
  localStorage.setItem('postedJobs', JSON.stringify(normalizedPosted));
  return [...normalizedPosted, ...apiJobs];
}
