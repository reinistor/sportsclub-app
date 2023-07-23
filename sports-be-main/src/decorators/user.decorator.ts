import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const AuthUser = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     console.log('auth', request.headers.Authorization.split(' ')[1]);
//     return parseJwt(request.headers.Authorization.split(' ')[1]);
//   },
// );

export const AuthUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return parseJwt(req['headers']['authorization'].split(' ')[1]).user;
});

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
