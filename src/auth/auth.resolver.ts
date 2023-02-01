import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignResponse } from './dto/sign-response';
import { SignInInput } from './dto/signin-input';
import { LogOutResponse } from './dto/signOut-response';
import { Public } from './decoretors/public.decoretors';
import { newTokenRespose } from './dto/newTokenResponse';
import { CurrentUser } from './decoretors/currentUser.decorator';
import { CurrentUserId } from './decoretors/currentUserid.decorator';
import { UseGuards } from '@nestjs/common';
import { accesRefreshTokenGuard } from './guards/accesRefreshToken.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => SignResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Public()
  @Mutation(() => SignResponse)
  signIn(@Args('SignInInput') SignInInput: SignInInput) {
    return this.authService.signIn(SignInInput);
  }

  @Mutation(() => LogOutResponse)
  logOut(@Args('id', {type: ()=>Int}) id: number) {
    return this.authService.logOut(id);
  }

  
  @Query(() => String)
  hello() {
    return 'Hello world';
  }

  @Public()
  @UseGuards(accesRefreshTokenGuard)
  @Mutation(() => newTokenRespose)
  getNewTokens(
    @CurrentUserId() userId: number,
    @CurrentUser('refreshToken') refreshToken: string,) {
    return this.authService.getNewTokens(userId, refreshToken)
  }


}
