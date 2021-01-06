const BASE_URL = 'https://api.openopus.org';

// Composers
export const OPEN_OPUS_COMPOSERS_BY_ID = BASE_URL + '/composer/list/ids/';
export const API_COMPOSERS_BY_ID = '/api/composers/';

export const OPEN_OPUS_COMPOSERS_BY_NAME = BASE_URL + '/composer/list/search/';
export const API_COMPOSERS_BY_NAME = '/api/composers/search/';

export const OPEN_OPUS_COMPOSERS_POPULAR = BASE_URL + '/composer/list/pop.json';
export const API_COMPOSERS_POPULAR = '/api/composers/popular';

export const OPEN_OPUS_COMPOSERS_ESSENTIAL =
  BASE_URL + '/composer/list/rec.json';
export const API_COMPOSERS_ESSENTIAL = '/api/composers/essential';

// Epochs
export const OPEN_OPUS_COMPOSER_GENRES = BASE_URL + '/genre/list/composer/';

// Works
export const OPEN_OPUS_WORKS_SEARCH = BASE_URL + '/work/list/composer/';
export const API_WORKS_SEARCH = '/api/search';

// Random
export const OPEN_OPUS_RANDOM_WORKS = BASE_URL + '/dyn/work/random';
export const API_RANDOM_WORKS = '/api/random';
