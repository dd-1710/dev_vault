import express from 'express';
import { Login, SignUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', Login);
router.post('/signUp', SignUp);

export default router;