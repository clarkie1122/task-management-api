import { createParamDecorator } from "@nestjs/common";
import { UserEntity } from "@inteck/global-components";

export const GetUser = createParamDecorator((data, [root, args, ctx, info]): UserEntity => {
    return ctx.req.user;
});