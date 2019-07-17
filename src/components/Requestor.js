import axios from 'axios';
const SERVER_URL = 'http://localhost:5000';

const DEFAULT_PARAMS = {
  filters: {},
  offset: 0,
  size: 10
};

export const Requestor = {
  get(url, config, params) {
    if (!url || url[0] !== '/') {
      return Promise.reject('Url should be prefixed with slash');
    }
    return axios.get(`${SERVER_URL}${url}`, {
      headers: {
        ...config
      },
      params: {
        ...DEFAULT_PARAMS,
        ...params
      }
    });
  }
};

export default Requestor;
