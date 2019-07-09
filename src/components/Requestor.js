import axios from 'axios';
// import { SERVER_URL } from '/environments';
const SERVER_URL = 'http://localhost:5000';

// const Requestor = ({ url }) => {
//   if (!url || url[0] !== '/') {
//     return Promise.reject('Url should be prefixed with slash');
//   }
//   return axios.get(`${SERVER_URL}${url}`);
// };

export const Requestor = {
  get(url, config, params) {
    if (!url || url[0] !== '/') {
      return Promise.reject('Url should be prefixed with slash');
    }
    return axios.get(`${SERVER_URL}${url}`, {
      headers: {
        ...config
      }
    });
  }
};

export default Requestor;
