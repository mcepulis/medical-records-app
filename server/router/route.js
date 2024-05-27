import express from 'express';
import { allUsers } from '../controllers/user-controller.js';
import { allData } from '../controllers/data-controller.js';


const router = express.Router();

router.get('/user', allUsers);
router.get('/data', allData);

export default router;