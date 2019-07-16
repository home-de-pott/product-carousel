import axios from 'axios';

const deploymentUrl =
  'http://ec2-18-221-151-249.us-east-2.compute.amazonaws.com/product-data/';

const localUrl = 'http://localhost:3000/product-data/';

const http = {
  productData: {
    get: async function(id) {
      try {
        const response = await axios.get(localUrl + id);
        console.log('Response', response);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default http;
