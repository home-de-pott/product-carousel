# Product-Carousel

This is a product-carousel built for a [clone of the Home Depot website](https://github.com/baembry/brian-proxy). It is used to display products related to the currently viewed product as well as a customer's recently viewed products.

### Tech Stack

- Front end: React
- Back end: Express
- Database: MySql
- Deployment: AWS Elastic Beanstalk and Docker

### Technical Challenges

This microservice uses a product thumbnail that I also wanted to use in another service. To reduce duplication of code, I refactored the thumbnail as it's own react component, exported it as an npm module, and then import it wherever I need it.
