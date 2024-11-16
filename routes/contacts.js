import { Router } from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  softDeleteContact,
  updateContact,
} from '../controllers/contacts.js';

const router = Router();

router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', softDeleteContact);

export default router;
