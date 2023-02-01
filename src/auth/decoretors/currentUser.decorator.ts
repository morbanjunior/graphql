import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import {JwtPayloadrWithRefreshToken} from "../types"
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
    (
        data: keyof JwtPayloadrWithRefreshToken | undefined,
        constext: ExecutionContext, 
    )=>{
        const ctx = GqlExecutionContext.create(constext);
        const req = ctx.getContext().req;
        if(data) return req.user[data];

        return req.user;
    }
);