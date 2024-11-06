import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client = null; 

const connect = async () => {
  if (!client) {
    client = new MongoClient(uri);
    try {
      await client.connect();
    } catch (e) {
      console.error(e);
      client = null;
    }
  }

  return client;
};

export default connect;
