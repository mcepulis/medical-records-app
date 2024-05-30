import express from 'express';
import { dataList } from '../controllers/data-controller';

const router = express.Router();

router.get('/users', allData); 

export default router;
