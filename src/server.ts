import express from 'express';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './routes/auth.routes';
import './config/passport.config';

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(passport.initialize());
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

export default app;