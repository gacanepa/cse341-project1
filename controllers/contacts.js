import { ObjectId } from 'mongodb';
import withClient from '../data/connectionManager.js';

// GET /contacts
export const getAllContacts = async (req, res) => {
  withClient(async (client) => {
    const cursor = await client.db('project1').collection('contacts').find()
    const result = await cursor.toArray();
    res.send(result).status(200);
  });
};

// GET /contacts/:id
export const getContactById = async (req, res) => {
  // To fix the deprecation issue, you should use ObjectId.createFromHexString
  // instead of directly using the ObjectId constructor.
  const userId = ObjectId.createFromHexString(req.params.id);
  withClient(async (client) => {
    const result = await client.db('project1').collection('contacts').findOne({ _id: userId });
    res.send(result).status(200);
  });
};
