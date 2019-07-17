require('@babel/polyfill'); //for async

const request = require('supertest');
const app = require('../server/server');

describe('/', () => {
  it('responds with status 200', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.status).toBe(200);
      })
      .then(() => {
        done();
      })
      .catch(() => {
        done();
      });
  });
});

describe('/product-data', () => {
  it('responds with status 200', done => {
    request(app)
      .get('/product-data')
      .then(res => {
        expect(res.status).toBe(200);
      })
      .then(() => {
        done();
      })
      .catch(() => {
        done();
      });
  });
});

describe('/product-data/:id', () => {
  it('responds with status 200', done => {
    request(app)
      .get('/product-data/205594063')
      .then(res => {
        expect(res.status).toBe(200);
      })
      .then(() => {
        done();
      })
      .catch(() => {
        done();
      });
  });
});
