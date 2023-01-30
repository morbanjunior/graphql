import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { SignInInput } from './dto/signin-input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private jwtService: JwtService,
    private configService: ConfigService){}

 async signUp(signUpInput: SignUpInput) {

     const hashedPassword = await argon.hash(signUpInput.password);
     const user = await this.prisma.user.create({
      data:{
        hashedPassword,
        username: signUpInput.username,
        email: signUpInput.email
        
      }
     });

     const {accessToken, refreshToken} = await this.createTokens(
     user.id,
     user.email
     );

    await this.updateRefreshToken(user.id, user.email);
    return { accessToken, refreshToken, user};
  }

  async signIn(sigInInput:SignInInput) {
    const user = await this.prisma.user.findUnique({
      where:{
        email: sigInInput.email
      }
    });

    if(!user){
      throw new ForbiddenException(
        'Access Denided',
    ); 
    }

    const doPasswordMatch = await argon.verify(user.hashedPassword, sigInInput.password);

    if(!doPasswordMatch){
      throw new ForbiddenException(
        'Access Denided',
    ); 
    }

    const {accessToken, refreshToken} = await this.createTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, refreshToken)
    return {accessToken, refreshToken, user};
  }

  async logOut(userId: number){
    await this.prisma.user.updateMany({
      where:{
        id: userId,
        hashedRereshToken: {not: ''},
      }, 
      data:{
        hashedRereshToken: ''
      }
    })

    return {loggedOut: true};
  }

 async createTokens (userId:number, email: string) {
    const accessToken = this.jwtService.sign({
      userId,
      email,
    },{expiresIn: '20s', secret: this.configService.get('JWT_SECRET')});

    const refreshToken = this.jwtService.sign({
      userId,
      email,
      accessToken,
    },{expiresIn: '7d', secret: this.configService.get('REFRESH_JWT_SECRET')});

    return { accessToken, refreshToken}
 }

 async updateRefreshToken(userId:number, refreshToken:string){
  const hashedRereshToken = await argon.hash(refreshToken);
  await this.prisma.user.update({
    where:{
      id: userId
    },
    data:{
      hashedRereshToken
    }
  })
 }

  
}
