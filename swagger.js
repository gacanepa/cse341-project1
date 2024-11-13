import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My Contacts API',
    description: 'Contacts Management - BYU-I CSE341 Fall 2024'
  },
  host: 'localhost:3001'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js', './routes/contacts.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
