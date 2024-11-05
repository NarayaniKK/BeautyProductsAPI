module.exports = {
    apps: [
      {
        name: "app",
        script: "./app.js",
        env: {
          NODE_ENV: "development",
          MONGODB_URI: "mongodb+srv://narayanikkhatavkar:7ioqGiMC1jWisa45@shopifycluster.nmohw.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=ShopifyCluster"
        },
        env_production: {
          NODE_ENV: "production",
          MONGODB_URI: "mongodb+srv://narayanikkhatavkar:7ioqGiMC1jWisa45@shopifycluster.nmohw.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=ShopifyCluster"
        }
      }
    ]
  };
  