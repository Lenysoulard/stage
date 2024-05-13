import {createUser, getUserSexeCount, getUsersAgeCount} from '../controllers/user.controller.js';
import express from 'express';
const router = express.Router();

router.post('/users',createUser);
router.get('/users/sexe', getUserSexeCount);
router.get('/users/age', getUsersAgeCount);


export default router;

