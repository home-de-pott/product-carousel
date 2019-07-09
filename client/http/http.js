import axios from 'axios';

const http = {
  productData: {
    get: async function(id) {
      try {
        const response = await axios.get('/product-data/' + id);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default http;
