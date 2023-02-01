import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtPayload } from "../types";



@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt',
){
    constructor(
         config: ConfigService){
         super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
            passReqTocallback: true,
        })
    }

    async validate(payload: JwtPayload){
        return payload   
    }
}