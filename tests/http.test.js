import '@babel/polyfill';
import http from '../client/http/http';

jest.mock('../client/http/http');

test('Trivial tests work', () => {
  expect(true).toBe(true);
});

describe('The http module', () => {
  test('productData.get should take an id as a parameter and return related products from the db', async done => {
    const data = await http.productData.get(205594063);
    expect(data.length).not.toBe(0);
    done();
  });
});
