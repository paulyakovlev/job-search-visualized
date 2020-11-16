const statusApiUrl = process.env.REACT_APP_AIRTABLE_STATUS_API_URL;
const sourceApiUrl = process.env.REACT_APP_AIRTABLE_SOURCE_API_URL;
const progressApiUrl = process.env.REACT_APP_AIRTABLE_PROGRESS_API_URL;
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;

export function fetchStatus() {
  return fetch(statusApiUrl + apiKey).then((res) => res.json());
}

export function fetchSource() {
  return fetch(sourceApiUrl + apiKey).then((res) => res.json());
}

export function fetchProgress() {
  return fetch(progressApiUrl + apiKey).then((res) => res.json());
}

export function fetchDates() {
  return fetch(progressApiUrl + apiKey).then((res) => res.json());
}
