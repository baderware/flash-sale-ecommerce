import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
     ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({     
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: +configService.get("DB_PORT"),  
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASS"),
        database: configService.get("DB_NAME"),
        logging: true,
        autoLoadEntities: true,//  Replaced the fragile 'entities' path this will atomaticlly loads the availble entities
        synchronize: true, //this must be set to false in production! 
      }),
    }),
    UsersModule, 
    ProductsModule, 
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
