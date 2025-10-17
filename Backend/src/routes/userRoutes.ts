import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  linkUser,
  unlinkUser
} from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:id/link', linkUser);
router.delete('/:id/unlink', unlinkUser);

export default router;
