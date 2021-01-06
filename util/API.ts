import { API_COMPOSERS_ESSENTIAL, API_COMPOSERS_POPULAR } from '../constants/OpenOpus';

export const getPopularComposers = () =>
  fetch(API_COMPOSERS_POPULAR, {
    method: 'GET',
  });

export const getEssentialComposers = () =>
  fetch(API_COMPOSERS_ESSENTIAL, {
    method: 'GET',
  });
