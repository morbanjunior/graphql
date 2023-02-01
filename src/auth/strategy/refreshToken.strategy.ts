import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload, JwtPayloadrWithRefreshToken } from "../types";
import { Request } from "express";




@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
){
    constructor(
         config: ConfigService){
         super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('REFRESH_JWT_SECRET'),
            passReqTocallback: true,
        })
    }

    validate(req: Request, payload: JwtPayload): JwtPayloadrWithRefreshToken {
        const refreshToken = req
        ?.get('authorization')
        ?.replace('Bearer', '')
        .trim(); 

        // console.log(payload, 'payload!')
        return {
        ...payload, 
        refreshToken  
        };
    }
}