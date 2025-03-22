import express from 'express';
import {signup,verifyUser,login,logout, forgotPassword,resetPassword,checkAuth} from '../controllers/auth_Controllers.mjs';
import authorize from '../middleware/auth.mjs'
const router = express.Router();

router.get('/check-auth',authorize,checkAuth)
router.post('/signup',signup);
router.post('/verify-email',verifyUser)
router.post('/login',login)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)
router.get('/logout',logout)

export default router;