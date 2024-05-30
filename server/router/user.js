import express from 'express';
import { userList } from '../controllers/user-controller';

const router = express.Router();

router.get('/users', allUsers); 

export default router;