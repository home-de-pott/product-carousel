import axios from 'axios';

const carouselProduction =
  'http://homedepottcarousel.us-east-2.elasticbeanstalk.com';

const carouselDev = 'http://localhost:3000';
const current = carouselDev;
if(process.env.ENVIRONMENT === 'PRODUCTION'){
  current = carouselProduction
} 

const reviewsApi =
  'http://homedepottreviews.us-east-2.elasticbeanstalk.com/reviews/';

const http = {
  products: {
    get: async function(id) {
      try {
        const response = await axios.get(current + '/product-data/' + id);
        return response.data[0];
      } catch (error) {
        console.error('error getting related products', error);
      }
    },
  },
  relatedProducts: {
    get: async function(id) {
      try {
        const response = await axios.get(current + '/related-products/' + id);
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
