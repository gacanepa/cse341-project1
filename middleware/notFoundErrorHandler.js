import { StatusCodes } from 'http-status-codes';

const notFoundErrorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });
};

export default notFoundErrorHandler;
