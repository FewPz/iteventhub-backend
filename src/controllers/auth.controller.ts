import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/auth.config';
import { UserService } from '../services/user.service';

export class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public googleCallback = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        try {
            const user = req.user as Express.User;
            const token = jwt.sign({ id: user.id }, config.jwt.secret, {
                expiresIn: config.jwt.expiresIn,
            });

            res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
        } catch (error) {
            console.error('Google callback error:', error);
            res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
        }
    };

    public verifyToken = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        try {
            const user = req.user as Express.User;
            const userData = await this.userService.findById(user.id);

            if (!userData) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json({ user: userData });
        } catch (error) {
            res.status(401).json({ message: 'Authentication failed' });
        }
    };

    public getCurrentUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = req.user as Express.User;
            const userData = await this.userService.findById(user.id);

            if (!userData) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json(userData);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch user data' });
        }
    };

    public logout = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        try {
            req.logout(() => {
                res.json({ message: 'Logged out successfully' });
            });
        } catch (error) {
            res.status(500).json({ message: 'Logout failed' });
        }
    };
}