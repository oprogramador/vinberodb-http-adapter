import request from 'superagent';

const options = Symbol('options');

class VinberoHTTPAdapter {
  constructor(_options) {
    this[options] = _options;
  }

  get(key) {
    return request(`${this[options].urlForGet}${key}`)
      .then(({ body }) => body.value);
  }

  set(key, value) {
    return request.put(`${this[options].urlForSet}${key}`)
      .send({ value })
      .then(() => null);
  }
}

export default VinberoHTTPAdapter;
