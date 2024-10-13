import express from 'express';
import Joi from 'joi';
import { signup, login, logout, verifyLogin } from '../controllers/userController';
import { validate } from './../middlewares/validate';
import { isAuthenticated } from '../middlewares/auth';

const router = express.Router();

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});



router.post('/signup', validate(schema), signup);
router.post('/login', validate(schema), login);
router.get('/verify', isAuthenticated, verifyLogin);
router.post('/logout', logout);

export default router;
