
// the tokens get captured by the guards will be sent here to get verified
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET_KEY')!,
    });
  }

// jwt.strategy.ts
validate(payload: any) {
  // Passport attaches this object to the "request.user"
  return { 
    userId: payload.sub, 
    email: payload.email, 
    role: payload.role // <--- EXTREMELY IMPORTANT!
  }; 
}
}