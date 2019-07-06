module.exports = {
  apps: [
    {
      name: "product-carousel",
      script: "./server/server.js"
    }
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "ec2-3-17-150-47.us-east-2.compute.amazonaws.com",
      key: "~/.ssh/carousel.pem",
      ref: "origin/master",
      repo: "https://github.com/home-de-pott/product-carousel.git",
      path: "/home/ubuntu/product-carousel",
      'post-deploy': "npm install && pm2 startOrRestart ecosystem.config.js",
    }
  }
};
