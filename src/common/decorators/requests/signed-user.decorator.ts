import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  // password and salt are removed from the user object before it is returned to the client to prevent security issues (e.g. password hash leak)

  return request.user;
});
