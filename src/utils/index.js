import { history } from '../App';

export const forwardTo = (location) => history.push(location);

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeWords(string) {
	return string.replace(/(?:^|\s)\S/g, function(a) {
		return a.toUpperCase();
	});
}

export const toSnakeCase = (str) =>
	str &&
	str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map((x) => x.toLowerCase())
		.join('_');

export const API_ENDPOINT = 'https://lucent-sprinkles-5a0493.netlify.app/';
// export const API_ENDPOINT = 'http://localhost:5000';

export const PAPERS_WITH_CODE_URL = 'https://paperswithcode.com/datasets';

export const ZENODO_URL = 'https://zenodo.org/search';

export const DATASETSEARCH_URL = 'https://datasetsearch.research.google.com/search';

export const KAGGLE_URL = 'https://www.kaggle.com/datasets';

export const MICROSOFT_RESEARCH_URL = 'https://msropendata.com/datasets';
