import JobModel from './JobModel.mjs';
import JobList from './JobList.mjs';
import { getParam } from './utils.mjs';

async function initApp() {
  const category = getParam('category') || 'Data Engineer';
  
  // 1. Create the Model
  const model = new JobModel(category);
  
  // 2. Target the DOM element
  const listElement = document.querySelector(".jobList");
  
  // 3. Create the List controller and PASS the model
  const jobList = new JobList(category, model, listElement);
  
  // 4. Initialize
  await jobList.init();
}

initApp();