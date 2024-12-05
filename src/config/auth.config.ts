import dotenv from 'dotenv';
dotenv.config();

export const config = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || ''
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret-key',
    expiresIn: '7d'
  }
};