import qs from 'qs';
import queryString from 'query-string';

export default {
  createFilterString(obj) {
    let str = '';
    for (const property in obj) {
      if (obj[property] === '') {
        delete obj[property];
      }
    }
    return qs.stringify({ filter: obj });
  },
  stringify(obj) {
    return qs.stringify(obj);
  },
  parse(str) {
    return queryString.parse(str);
  },
  createUrlString(obj) {
    let str = '';
    for (const property in obj) {
      if (obj[property] === '') {
        delete obj[property];
      }
    }
    return qs.stringify(obj);
  },
};
