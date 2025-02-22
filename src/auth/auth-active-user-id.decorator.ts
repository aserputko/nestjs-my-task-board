import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ActiveUserId = createParamDecorator((_: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userId: number | undefined = request.user?.userId;
  return userId;
});
