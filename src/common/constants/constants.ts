import * as config from 'config';

export const jwtConstants: JwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: config.get('jwt.expiresIn'),
};

export const serverConstants: ServerConstants = {
  port: process.env.PORT || config.get('server.port'),
  origin: process.env.ORIGIN || config.get('server.origin'),
};

type ServerConstants = {
  port: number | string;
  origin: string;
};

type JwtConstants = {
  secret: string;
  expiresIn: string;
};
