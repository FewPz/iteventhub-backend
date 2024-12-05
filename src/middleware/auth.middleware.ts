import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { UserPayload } from '../types/auth.types';

interface AuthRequest extends Request {
    user?: UserPayload;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: UserPayload | false) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
};
