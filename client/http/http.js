import axios from 'axios';

const http = {
  productData: {
    get: async function(id) {
      try {
        const response = await axios.get(
          'http://ec2-18-221-151-249.us-east-2.compute.amazonaws.com/product-data/' +
            id
        );
        console.log('Response', response);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default http;
