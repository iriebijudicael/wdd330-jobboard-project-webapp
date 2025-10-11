import { jobCardTemplate } from "../templates/jobCardTemplate.mjs";
import { jobDetailTemplate } from "../templates/jobDetailTemplate.mjs";

let jobs = [];

export async function renderJobList(filter = {}) {
  if (!jobs.length) {
    jobs = await fetch("data/mock-jobs.json").then(r => r.json());
  }
  let filteredJobs = jobs;
  // Apply filters here if needed
  const jobList = document.getElementById("job-list");
  jobList.innerHTML = filteredJobs.map(jobCardTemplate).join('');
  jobList.querySelectorAll(".job-card").forEach(card => {
    card.onclick = () => showJobDetail(card.dataset.id);
  });
}

function showJobDetail(id) {
  const job = jobs.find(j => j.id == id);
  document.getElementById("job-detail").innerHTML = jobDetailTemplate(job);
  document.getElementById("close-detail").onclick = () => {
    document.getElementById("job-detail").innerHTML = '';
  };
}







// // Toggle hamburger menu
// const hamburger = document.getElementById('hamburger');
// const navLinks = document.getElementById('nav-links');

// hamburger.addEventListener('click', () => {
//     navLinks.classList.toggle('active');
// });

// // Fetch Members Data
// async function fetchMembers() {
//     const response = await fetch('data/members-2.json');
//     const data = await response.json();
//     return data;
// }

// // Display Members
// async function displayMembers(view = 'grid') {
//     const directory = document.getElementById('directory');
//     const members = await fetchMembers();

//     directory.innerHTML = ''; // Clear existing content

//     members.forEach(member => {
//         const card = document.createElement('div');
//         card.classList.add('member-card');
//         if (view === 'list') card.classList.add('list-view');

//         card.innerHTML = `
//             <img src="images/${member.image}" alt="${member.name}">
//             <h3>${member.name}</h3>
//             <p>${member.address}</p>
//             <p>${member.phone}</p>
//             <p>Membership Level: ${member.membership}</p>
//             <p><a href="${member.website}" target="_blank">Visit Website</a></p>`;

//         directory.appendChild(card);
//     });
// }

// // Toggle View
// document.getElementById('grid-view').addEventListener('click', () => {
//     document.getElementById('directory').classList.remove('list-view');
//     displayMembers('grid');
// });

// document.getElementById('list-view').addEventListener('click', () => {
//     document.getElementById('directory').classList.add('list-view');
//     displayMembers('list');
// });



// // Initial Load
// displayMembers();