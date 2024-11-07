import { ObjectId } from 'mongodb';
import { StatusCodes } from 'http-status-codes';
import withClient from '../data/connectionManager.js';
import { DEFAULT_COLLECTION, DEFAULT_DATABASE } from '../utilities/constants.js';

// GET /contacts
export const getAllContacts = async (req, res) => {
  withClient(async (client) => {
    const cursor = await client.db(DEFAULT_COLLECTION).collection(DEFAULT_DATABASE).find()
    const result = await cursor.toArray();
    res.send(result).status(StatusCodes.OK);
  });
};

// GET /contacts/:id
export const getContactById = async (req, res) => {
  // To fix the deprecation issue, you should use ObjectId.createFromHexString
  // instead of directly using the ObjectId constructor.
  const userId = ObjectId.createFromHexString(req.params.id);
  withClient(async (client) => {
    const result = await client.db(DEFAULT_COLLECTION).collection(DEFAULT_DATABASE).findOne({ _id: userId });
    res.send(result).status(StatusCodes.OK);
  });
};
