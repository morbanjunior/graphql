import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignResponse } from './dto/sign-response';
import { SignInInput } from './dto/signin-input';
import { LogOutResponse } from './dto/signOut-response';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => SignResponse)
  signIn(@Args('SignInInput') SignInInput: SignInInput) {
    return this.authService.signIn(SignInInput);
  }

  @Mutation(() => LogOutResponse)
  logOut(@Args('id', {type: ()=>Int}) id: number) {
    return this.authService.logOut(id);
  }

}
