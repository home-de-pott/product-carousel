import axios from 'axios';

const deploymentUrl =
  'http://homedepottcarousel.us-east-2.elasticbeanstalk.com/product-data/';

const localUrl = 'http://localhost:3000/product-data/';

const reviewsApi =
  'http://homedepottreviews.us-east-2.elasticbeanstalk.com/reviews/';

const http = {
  relatedProducts: {
    get: async function(id) {
      try {
        const response = await axios.get(deploymentUrl + id);
        return response.data;
      } catch (error) {
        console.error('error getting related products', error);
      }
    },
  },
  recentlyViewedProducts: {
    get: async function(id) {
      try {
        const response = await axios.get(
          'http://ec2-18-217-166-165.us-east-2.compute.amazonaws.com/getUserViews',
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        console.error('error getting recently viewed products', error);
      }
    },
  },
  reviews: {
    get: async function(id) {
      try {
        const response = await axios.get(reviewsApi + id);
        return response.data;
      } catch (error) {
        console.error('error getting reviews', error);
      }
    },
  },
};

export default http;
