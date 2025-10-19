
import { fetchJobs, filterJobs } from 'models/jobList.mjs';
import { 
  displayJobs, 
  showError, 
  hideError, 
  showLoading, 
  hideLoading 
} from 'models/jobFilter.mjs';

export async function handleLoadJobs(
  jobListEl, 
  errorEl, 
  loadingEl, 
  categoryFilter, 
  locationFilter
) {
  showLoading(loadingEl);
  hideError(errorEl);

  try {
    const jobs = await fetchJobs();
    const filtered = filterJobs(jobs, categoryFilter.value, locationFilter.value);
    displayJobs(filtered, jobListEl);
  } catch (error) {
    showError(errorEl, error.message);
  } finally {
    hideLoading(loadingEl);
  }
}

export function handleClearJobs(jobListEl, errorEl) {
  jobListEl.innerHTML = '';
  hideError(errorEl);
}
