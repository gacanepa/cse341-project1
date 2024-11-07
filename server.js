import express from 'express';
import indexRoutes from './routes/index.js';
import contactsRoutes from './routes/contacts.js';

const app = express();

const port = process.env.PORT || 3001;

app.use('/', indexRoutes);
app.use('/contacts', contactsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
