import express from 'express';

import { login } from '../controllers/user-controller.js';
import { allUsers } from '../controllers/user-controller.js';
import { User } from '../controllers/user-controller.js';
import { addUser } from '../controllers/user-controller.js';
import { editUser } from '../controllers/user-controller.js';
import { deleteUser } from '../controllers/user-controller.js';

import { allPressureTests } from '../controllers/data-blood-pressure.js';
import { PressureTest } from '../controllers/data-blood-pressure.js';
import { addPressure } from '../controllers/data-blood-pressure.js';
import { editPressure } from '../controllers/data-blood-pressure.js';
import { deletePressure } from '../controllers/data-blood-pressure.js';
import { userPressure } from '../controllers/data-blood-pressure.js';

import { allBloodTests } from '../controllers/data-blood-test.js';
import { BloodTest } from '../controllers/data-blood-test.js';
import { addBloodTest } from '../controllers/data-blood-test.js';
import { editBloodTest } from '../controllers/data-blood-test.js';
import { deleteBloodTest } from '../controllers/data-blood-test.js';

import { allVisits } from '../controllers/data-visits.js';
import { Visit } from '../controllers/data-visits.js';
import { addVisit } from '../controllers/data-visits.js';
import { editVisit } from '../controllers/data-visits.js';
import { deleteVisit} from '../controllers/data-visits.js';

import { cookieTest } from '../controllers/cookie.js';

const router = express.Router();

//USERS
router.post('/login', login);
router.get('/users', allUsers);
router.get('/users/:id', User);
router.post('/users/add', addUser);
router.put('/users/edit/:id', editUser);
router.delete('/users/delete/:id', deleteUser);

//BLOOD PRESSURE
router.get('/data/blood-pressure', allPressureTests);
// router.get('/data/blood-pressure/:id', PressureTest);
router.post('/data/blood-pressure/add', addPressure);
router.put('/data/blood-pressure/edit/:id', editPressure);
router.delete('/data/blood-pressure/delete/:id', deletePressure);
router.get('/data/blood-pressure/:userId', userPressure);

//BLOOD TEST
router.get('/data/blood-test', allBloodTests);
router.get('/data/blood-test/:id', BloodTest);
router.post('/data/blood-test/add', addBloodTest);
router.put('/data/blood-test/edit/:id', editBloodTest);
router.delete('/data/blood-test/delete/:id', deleteBloodTest);

//VISITS
router.get('/data/visits', allVisits);
router.get('/data/visits/:id', Visit);
router.post('/data/visits/add', addVisit);
router.put('/data/visits/edit/:id', editVisit);
router.delete('/data/visits/delete/:id', deleteVisit);

//COOKIE-TEST
router.get('/cookie-test', cookieTest);

export default router;