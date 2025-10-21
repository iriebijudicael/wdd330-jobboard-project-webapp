// src/js/utils.mjs
export async function fetchJobs() {
  try {
    const response = await fetch('/data/mock-jobs.json');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
