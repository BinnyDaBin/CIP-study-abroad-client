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
  },
  post(url, config = {}, body = {}) {
    if (!url || url[0] !== '/') {
      return Promise.reject('Url should be prefixed with slash');
    }
    return axios.post(`${SERVER_URL}${url}`, body, {
      headers: config
    });
  },
  put(url, config = {}, body = {}) {
    if (!url || url[0] !== '/') {
      return Promise.reject('Url should be prefixed with slash');
    }
    return axios.put(`${SERVER_URL}${url}`, body, {
      headers: config
    });
  }
};

export default Requestor;
