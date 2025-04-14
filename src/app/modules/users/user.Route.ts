import express from 'express';
import { deleteUser, getAllUsers, updateUserProfile, updateUserRole } from './user.controller';

const router = express.Router();

router.get('/',  getAllUsers);
router.put('/:userId/role',  updateUserRole);
router.put("/:userId/profile", updateUserProfile);
router.delete('/:userId', deleteUser);

export default router;
