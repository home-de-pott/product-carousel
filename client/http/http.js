import axios from 'axios';

const deploymentUrl =
  'http://ec2-18-224-6-116.us-east-2.compute.amazonaws.com/product-data/';

const localUrl = 'http://localhost:3000/product-data/';

const reviewsApi =
  'http://ec2-18-219-134-212.us-east-2.compute.amazonaws.com/reviews/';

const http = {
  productData: {
    get: async function(id) {
      try {
        const response = await axios.get(deploymentUrl + id);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  reviews: {
    get: async function(id) {
      try {
        const response = await axios.get(
          'http://ec2-18-219-134-212.us-east-2.compute.amazonaws.com/reviews/' +
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
