import ky from 'ky';

const api = ky.create({
  prefixUrl: 'https://hitoiki-monkey-api.herokuapp.com/v1',
});

export default api;
