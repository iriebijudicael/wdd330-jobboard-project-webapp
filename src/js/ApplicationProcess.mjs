export default class ApplicationProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
  }

  init() {
    this.list = getLocalStorage(this.key);
  }

  displayApplicationSummary() {
    const summaryElement = qs(this.outputSelector);
    summaryElement.innerText = `You are applying for ${this.list.length} positions.`;
  }
  
  // Method to handle the "Submit Application" button logic
}