import { getLocalStorage, renderListWithTemplate, qs } from "./utils.mjs";

export default class SavedJobs {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  init() {
    const list = getLocalStorage(this.key) || [];
    this.renderSavedList(list);
  }

  renderSavedList(list) {
    renderListWithTemplate(this.savedJobTemplate, this.listElement, list, "afterbegin", true);
  }

  savedJobTemplate(job) {
    return `
      <li class="saved-job-item">
        <div>
          <h4>${job.title}</h4>
          <p>${job.company}</p>
        </div>
        <button class="remove-job" data-id="${job.id}">Remove</button>
      </li>`;
  }
}