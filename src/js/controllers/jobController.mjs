// /js/controllers/JobController.mjs
import { fetchJobsFromServer } from '../services/apiService.mjs';
import { renderJobs, showAlert } from '../views/jobCardView.mjs';

function toggleLoading(show) {
  const loader = document.getElementById('loading');
  loader.hidden = !show;
}

export async function handleJobSearch() {
  const keyword = document.getElementById('keyword').value.trim();
  const location = document.getElementById('location').value.trim();
  const type = document.getElementById('type').value;
  const experience = document.getElementById('experience').value;

  const filters = { location, type, experience };

  try {
    toggleLoading(true); // Show spinner
    const jobs = await fetchJobsFromServer(keyword, filters);
    renderJobs(jobs);
  } catch (err) {
    console.error(err);
    showAlert('Error loading jobs. Please try again later.', false);
  } finally {
    toggleLoading(false); // Hide spinner
  }
}

export function setupJobAlert() {
  const alertBtn = document.getElementById('alert-btn');
  alertBtn.addEventListener('click', () => {
    const email = document.getElementById('alert-email').value.trim();
    if (!email || !email.includes('@')) {
      showAlert('Please enter a valid email address.', false);
      return;
    }
    localStorage.setItem('jobAlertEmail', email);
    showAlert('Subscribed successfully! You will receive job alerts soon.');
  });
}
