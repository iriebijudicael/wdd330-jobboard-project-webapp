// JobController.mjs
import { JobModel } from '../models/searchFilter.mjs';
import { JobView } from '../views/jobCardView.mjs';
import { getCountryByName } from '../services/countriesService.mjs';
import { getCurrentTemp } from '../services/weatherService.mjs';

export class JobController {
  constructor({ jobListEl, loadingEl, errorEl }) {
    this.model = new JobModel();
    this.view = new JobView(jobListEl, loadingEl, errorEl);
    this.countryCache = new Map();
    this.weatherCache = new Map();
  }

  /**
   * Load jobs, apply filters then enrich each job with flag & temp
   */
  async loadAndRender(query = '', filters = {}) {
    try {
      this.view.renderLoading(true);
      this.view.renderError(null);
      const jobs = await this.model.getJobs(query, filters);

      // enrich jobs in parallel (but be mindful of rate limits)
      const enriched = await Promise.all(jobs.map(async (job) => {
        // get country from job.location (try to pick last token if city)
        const countryName = this.extractCountry(job.location);
        if (countryName) {
          const country = await getCountryByName(countryName);
          if (country) job.flagUrl = country.flag;
          // use lat/lon from country as fallback for weather
          const latlng = job.latitude && job.longitude ? [job.latitude, job.longitude] : country?.latlng ?? null;
          if (latlng && latlng.length >= 2) {
            const key = `${latlng[0]}:${latlng[1]}`;
            if (!this.weatherCache.has(key)) {
              const temp = await getCurrentTemp(latlng[0], latlng[1]);
              this.weatherCache.set(key, temp);
            }
            job.temp = this.weatherCache.get(key);
          }
        }
        return job;
      }));

      this.view.renderJobs(enriched);
    } catch (err) {
      this.view.renderError(err.message || 'Failed to load jobs');
    } finally {
      this.view.renderLoading(false);
    }
  }

  extractCountry(locationText='') {
    // Simple heuristic: if location contains a comma, assume last part is country
    if (!locationText) return null;
    const parts = locationText.split(',').map(s => s.trim());
    if (parts.length === 1) return parts[0]; // might be "USA" / "France"
    return parts[parts.length - 1]; // last part
  }
}
