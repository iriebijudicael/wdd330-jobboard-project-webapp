export function jobDetailTemplate(job) {
  return `
    <div class="job-detail">
      <h2>${job.title}</h2>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <p><strong>Type:</strong> ${job.type}</p>
      <p><strong>Date Posted:</strong> ${job.datePosted}</p>
      <button id="close-detail">Close</button>
    </div>
  `;
}