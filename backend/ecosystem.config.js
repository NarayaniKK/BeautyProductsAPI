module.exports = {
    apps: [
      {
        name: 'app',
        script: './app.js',
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
          NODE_ENV: 'development',
          MONGODB_URI: 'mongodb+srv://narayanikkhatavkar:7ioqGiMC1jWisa45@shopifycluster.nmohw.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=ShopifyCluster'
        },
        env_production: {
          NODE_ENV: 'production',
          MONGODB_URI: 'your_production_mongodb_uri' // Set this to your production URI if applicable
        }
      }
    ]
  };
  