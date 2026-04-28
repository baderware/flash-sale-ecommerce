import { Inject, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';


@Module({

  imports: [
    //ConfigModule.forRoot(),
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => ({
        secret: configservice.get('SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],

  //they can be used anywhere (where injected ofcourse)
  controllers: [AuthController],
  //will expose the endpoints
})
export class AuthModule {}
