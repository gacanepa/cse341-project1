import connect from './database.js';

// High-order function to manage the connections
const withClient = async (callback) => {
  const client = await connect();
  try {
    await callback(client);
  } finally {
    await client.close();
  }
};

export default withClient;
