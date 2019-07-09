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
    get: async function() {
      const result = await new Promise(resolve => {
        resolve(fakeData);
      });
      return result;
    },
  },
};

export default http;
