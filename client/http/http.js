import axios from 'axios';

const http = {
  productData: {
    get: async function(id) {
      console.log('Getting', id, process.env);
      try {
        const response = await axios.get(
          'http://ec2-18-221-151-249.us-east-2.compute.amazonaws.com/product-data/' +
            id
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default http;
