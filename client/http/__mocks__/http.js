import testData from './testData';

const http = {
  productData: {
    get: function(id) {
      console.log('FROM HTTP', id);
      if (id === 1) {
        return [testData[0]];
      }
      return testData;
    },
  },
};

export default http;
