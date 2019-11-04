import api from './apiBase';

export const post = text =>
  api
    .post('parse', {
      json: {
        text,
      },
    })
    .json();
