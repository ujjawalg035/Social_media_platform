import express from "express";
import { UnFollowUser, deleteUser, followUser, getAllUsers, getUser, updateUser, getUserFollowers, getUserFollowing } from "../Controllers/UserController.js";
import authMiddleWare from "../Middleware/authMiddleWare.js";

const router = express.Router();


router.get('/', getAllUsers);
router.get('/:id', getUser);
router.get('/:id/followers', getUserFollowers);
router.get('/:id/following', getUserFollowing);
router.put('/:id', authMiddleWare, updateUser);
router.delete('/:id', authMiddleWare, deleteUser);
router.put('/:id/follow', authMiddleWare, followUser);
router.put('/:id/unfollow', authMiddleWare, UnFollowUser);

export default router;