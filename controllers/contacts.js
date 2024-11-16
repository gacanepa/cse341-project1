import { ObjectId } from 'mongodb';
import { StatusCodes } from 'http-status-codes';
import withClient from '../data/connectionManager.js';
import {
  DEFAULT_COLLECTION,
  DEFAULT_DATABASE,
  MISSING_MANDATORY_FIELDS,
} from '../utilities/constants.js';

// GET /contacts
export const getAllContacts = async (req, res) => {
  withClient(async (client) => {
    const cursor = await client.db(DEFAULT_DATABASE).collection(DEFAULT_COLLECTION).find({
      isDeleted: false,
    });
    const result = await cursor.toArray();
    res.send(result).status(StatusCodes.OK);
  });
};

// GET /contacts/:id
export const getContactById = async (req, res) => {
  // To address the deprecation issue, I use ObjectId.createFromHexString instead of the ObjectId constructor.
  const userId = ObjectId.createFromHexString(req.params.id);
  withClient(async (client) => {
    const result = await client.db(DEFAULT_DATABASE).collection(DEFAULT_COLLECTION).findOne({
      _id: userId,
      isDelete: false,
    });
    res.send(result).status(StatusCodes.OK);
  });
};

// POST /contacts
export const createContact = async (req, res) => {
  withClient(async (client) => {
    // Mandatory fields
    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      res.send(MISSING_MANDATORY_FIELDS).status(StatusCodes.BAD_REQUEST);
      return;
    }
    const result = await client.db(DEFAULT_DATABASE).collection(DEFAULT_COLLECTION).insertOne({
      ...req.body,
      isDeleted: false,
    });
    res.send(result).status(StatusCodes.CREATED);
  });
};

// PUT /contacts/:id
export const updateContact = async (req, res) => {
  const userId = ObjectId.createFromHexString(req.params.id);
  withClient(async (client) => {
    const result = await client.db(DEFAULT_DATABASE).collection(DEFAULT_COLLECTION).updateOne({ _id: userId }, { $set: req.body });
    res.send(result).status(StatusCodes.OK);
  });
};

// DELETE /contacts/:id/hard
export const hardDeleteContact = async (req, res) => {
  const userId = ObjectId.createFromHexString(req.params.id);
  withClient(async (client) => {
    const result = await client.db(DEFAULT_DATABASE).collection(DEFAULT_COLLECTION).deleteOne({ _id: userId });
    res.send(result).status(StatusCodes.NO_CONTENT);
  });
};

// DELETE /contacts/:id
export const softDeleteContact = async (req, res) => {
  const userId = ObjectId.createFromHexString(req.params.id);
  withClient(async (client) => {
    const result = await client.db(DEFAULT_DATABASE).collection(DEFAULT_COLLECTION).updateOne({ _id: userId }, { $set: { isDeleted: true } });
    res.send(result).status(StatusCodes.OK);
  });
};
