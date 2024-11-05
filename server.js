import express from 'express';
import indexRoutes from './routes/index.js';
const app = express();

const port = process.env.PORT || 3001;

app.use('/', indexRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
