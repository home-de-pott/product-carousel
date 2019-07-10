const fakeData = [
  {
    ID: '1',
    name: 'hammer',
    brand: 'dewalt',
    price: '1.99',
    photo: 'someurl',
  },
];

const http = {
  productData: {
    get: jest.fn().resolves,
  },
};

export default http;
