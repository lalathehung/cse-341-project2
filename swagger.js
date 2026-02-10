const swaggerAutogen = require('swagger-autogen')();

const doc = {
   info: {
      title: 'Book Library API',
      description: 'API for managing books and categories (W03 Project 2)'
   },
   host: 'cse-341-project2-7jea.onrender.com', // For Local Testing only; change to Render URL
   basePath: '/',
   schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/books.js', './routes/categories.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
   console.log('Swagger JSON generated successfully at ./swagger.json');
}).catch(err => {
   console.error('Error generating swagger.json:', err);
});