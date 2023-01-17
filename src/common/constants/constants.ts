import * as config from 'config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: config.get('jwt.expiresIn'),
};
