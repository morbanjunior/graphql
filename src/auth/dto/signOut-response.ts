import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LogOutResponse{
    @Field()
    loggedOut: boolean;
}