import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('My book API')
    .setDescription('The API description for my book project')
    .setVersion('1.0')  //well i might have dift versions :)
    .addBearerAuth() // this is for using JWT authentication!
    .build();

  // Create the document based on the config
  const document = SwaggerModule.createDocument(app, config);

  // the specific route for accessing the swagger
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
