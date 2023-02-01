import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import {JwtPayloadrWithRefreshToken} from "../types"
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUserId = createParamDecorator(
    (
        _: undefined,
        constext: ExecutionContext, 
    )=>{
        const ctx = GqlExecutionContext.create(constext);
        const req = ctx.getContext().req;
       return req.user.userId;

    }
);