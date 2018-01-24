import VinberoHTTPAdapter from 'vinberodb-http-adapter/VinberoHTTPAdapter';
import _ from 'lodash';
import bodyParser from 'body-parser';
import express from 'express';
import { testSimpleManager } from 'vinberodb-test-helpers';

const PORT = 2999;

let server;
let storage;
const createApp = () => {
  const app = express();
  app
    .use(bodyParser.json())
    .get('/path-for-get/:id', (req, res) => {
      res.json({ value: _.get(storage, req.params.id, null) });
    })
    .put('/path-for-set/:id', (req, res) => {
      storage[req.params.id] = req.body.value;

      res.sendStatus(204);
    });

  return app;
};

const urlForGet = `http://localhost:${PORT}/path-for-get/`;
const urlForSet = `http://localhost:${PORT}/path-for-set/`;

describe('VinberoHTTPAdapter', () => {
  beforeEach(() => {
    storage = {};
    const app = createApp();
    server = app.listen(PORT);
  });

  afterEach(() => {
    server.close();
  });

  testSimpleManager(() => new VinberoHTTPAdapter({ urlForGet, urlForSet }));
});
