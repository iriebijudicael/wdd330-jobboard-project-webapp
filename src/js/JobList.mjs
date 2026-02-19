import { jobCardTemplate, companyCardTemplate } from "./utils.mjs";

export default class JobList {
  constructor(model, listElement) {
    this.model = model;
    this.listElement = listElement;
  }

  async init(category) {
    this.listElement.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    let data;
    let template;

    if (category === "companyLists") {
      data = await this.model.fetchCompanies();
      template = companyCardTemplate;
    } else {
      data = await this.model.fetchAllJobs();
      template = jobCardTemplate;
    }

    this.render(data, template);
  }

  render(data, templateFunc) {
    this.listElement.innerHTML = data.map(templateFunc).join("");
  }
}