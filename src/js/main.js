// src/js/main.js
import { getAllJobs } from './utils.mjs';

const loader = document.getElementById('loading');
const jobList = document.getElementById('jobList');

const openPostBtn = document.getElementById('openPostJob');
const postDialog = document.getElementById('postJobDialog');
const postForm = document.getElementById('postJobForm');
const cancelPost = document.getElementById('cancelPost');

const savedKey = 'savedJobs';
const postedKey = 'postJob';

// helper: get saved job ids
function getSavedIds() {
  return JSON.parse(localStorage.getItem(savedKey) || '[]');
}
function toggleSave(jobId) {
  const list = getSavedIds();
  const idx = list.indexOf(jobId);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(jobId);
  }
  localStorage.setItem(savedKey, JSON.stringify(list));
  // re-render to update button state
  renderJobs(currentJobs);
}

// create unique id for posted jobs
function makeId() {
  return `local-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// render job cards
let currentJobs = [];

function renderJobs(jobs) {
  jobList.innerHTML = '';
  const savedIds = getSavedIds();

  if (jobs.length === 0) {
    jobList.innerHTML = '<p>No jobs found.</p>';
    return;
  }

  jobs.forEach(job => {
    const card = document.createElement('article');
    card.className = 'job-card';
    card.dataset.id = job.id;

    const isSaved = savedIds.includes(job.id);

    card.innerHTML = `
      <div class="job-card-inner">
        <h3 class="job-title">${escapeHtml(job.title)}</h3>
        <p class="job-meta"><strong>${escapeHtml(job.company)}</strong> — ${escapeHtml(job.location)}</p>
        <p class="job-type-salary"><em>${escapeHtml(job.type)}</em> | ${escapeHtml(job.salary ?? 'Not specified')}</p>
        <p class="job-desc">${escapeHtml(truncate(job.description, 150))}</p>

        <div class="job-actions">
          <a class="details-btn" href="job-details.html?id=${encodeURIComponent(job.id)}">View Details</a>
          <a class="apply-btn" href="${escapeAttr(job.applyUrl ?? '#')}" target="_blank" rel="noopener">Apply</a>
          <button class="save-btn">${isSaved ? 'Saved ♥' : 'Save'}</button>
        </div>
      </div>
    `;

    // add save handler
    const saveBtn = card.querySelector('.save-btn');
    saveBtn.addEventListener('click', () => {
      toggleSave(job.id);
    });

    jobList.appendChild(card);
  });
}

// small safe helpers
function truncate(str, n) {
  if (!str) return '';
  return str.length > n ? str.slice(0, n) + '...' : str;
}
function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escapeAttr(s = '') {
  return s ? s.replace(/"/g,'&quot;') : '#';
}

// load + show spinner
async function init() {
  loader.style.display = 'block';
  const jobs = await getAllJobs();
  // sort newest posted first (local first) - optional
  currentJobs = jobs;
  // tiny delay for UX
  setTimeout(() => {
    loader.style.display = 'none';
    renderJobs(currentJobs);
  }, 600);
}

document.addEventListener('DOMContentLoaded', init);

// POST JOB DIALOG logic
openPostBtn.addEventListener('click', () => postDialog.showModal());

cancelPost.addEventListener('click', () => postDialog.close());

postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // gather values
  const newJob = {
    id: makeId(),
    title: document.getElementById('jobTitle').value.trim(),
    company: document.getElementById('jobCompany').value.trim(),
    location: document.getElementById('jobLocation').value.trim(),
    type: document.getElementById('jobType').value,
    salary: document.getElementById('jobSalary')?.value || 'Not specified',
    description: document.getElementById('jobDescription').value.trim(),
    applyUrl: document.getElementById('jobApplyUrl').value.trim() || '#'
  };

  // save to localStorage postedJobs
  const posted = JSON.parse(localStorage.getItem(postedKey) || '[]');
  posted.unshift(newJob); // newest first
  localStorage.setItem(postedKey, JSON.stringify(posted));

  // refresh UI: update currentJobs and re-render
  currentJobs.unshift(newJob);
  renderJobs(currentJobs);

  postForm.reset();
  postDialog.close();
});
