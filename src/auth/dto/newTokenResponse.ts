import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class newTokenRespose {
    @Field()
    accessToken: string;
    @Field()
    refreshToken: string;
}
