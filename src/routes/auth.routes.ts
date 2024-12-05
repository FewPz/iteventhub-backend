import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import passport from 'passport';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    authController.googleCallback
);

router.get('/verify',
    authenticate,
    authController.verifyToken
);

router.get('/logout',
    authenticate,
    authController.logout
);

router.get('/me',
    authenticate,
    authController.getCurrentUser
);

export default router;