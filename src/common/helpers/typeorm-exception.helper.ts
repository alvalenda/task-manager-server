export function typeOrmExceptionHelper(err: any) {
  if (err.code === '23505') {
    throw {
      name: 'ConflictError',
      message: 'Username already exists',
    };
  }

  throw {
    name: 'InternalServerError',
    message: 'Internal server error signing up user',
  };
}
