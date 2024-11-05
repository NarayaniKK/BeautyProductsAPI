module.exports = {
    apps: [
      {
        name: "app",
        script: "./app.js",
        env: {
          MONGODB_URI: "mongodb+srv://narayanikkhatavkar:7ioqGiMC1jWisa45@shopifycluster.nmohw.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=ShopifyCluster",
          NODE_ENV: "production"
        }
      }
    ]
  };
  