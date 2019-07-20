import axios from 'axios';
const SERVER_URL = 'http://localhost:5000';

export const Requestor = {
  get(url, config = {}, params = {}) {
    if (!url || url[0] !== '/') {
      return Promise.reject('Url should be prefixed with slash');
    }
    return axios.get(`${SERVER_URL}${url}`, {
      headers: config,
      params
    });
  }
};

export default Requestor;
