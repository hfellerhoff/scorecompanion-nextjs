const BASE_URL = 'https://en.wikipedia.org/w/api.php'

export const WIKIPEDIA_TITLE_SEARCH_START = BASE_URL + '?action=query&list=search&srsearch='
export const WIKIPEDIA_TITLE_SEARCH_END = '&utf8=&format=json'

export const WIKIPEDIA_PAGE_BY_TITLE_START = BASE_URL + '?action=query&prop=extracts&exsentences=10&exlimit=1&titles='
export const WIKIPEDIA_PAGE_BY_TITLE_END = '&explaintext=1&formatversion=2&format=json' 