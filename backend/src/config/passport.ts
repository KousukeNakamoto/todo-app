import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { PrismaClient, User } from "@prisma/client";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload: { id: number }, done: any) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.id },
      });
      if (user) {
        const { password, ...userInfo } = user;
        return done(null, userInfo);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
