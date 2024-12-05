import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from './auth.config';
import { UserService } from '../services/user.service';

const userService = new UserService();

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userService.findByGoogleId(profile.id);

        if (!user) {
          user = await userService.create({
            googleId: profile.id,
            email: profile.emails?.[0].value || '',
            name: profile.displayName,
            avatar: profile.photos?.[0].value || '',
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret,
    },
    async (payload, done) => {
      try {
        const user = await userService.findById(payload.id);
        return user ? done(null, user) : done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);