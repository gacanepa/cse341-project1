import express from 'express';
import { errorHandler, notFoundErrorHandler } from './middleware/index.js';
import indexRoutes from './routes/index.js';
import contactsRoutes from './routes/contacts.js';
import docsRoutes from './routes/docs.js';

const app = express();

// Hide internal technical information
app.disable('x-powered-by');

// Request bodies will be sent as JSON
app.use(express.json());

const port = process.env.PORT || 3001;

app.use('/', indexRoutes);
app.use('/contacts', contactsRoutes);
app.use('/docs', docsRoutes);

app.use(notFoundErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
