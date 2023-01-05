import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const logger = new Logger('bootstrap');

  const config = new DocumentBuilder()
    .setTitle('Tasks Manager API')
    .setDescription('API for managing tasks')
    .setVersion('1.0')
    .setContact(
      'Flavio Alvarenga',
      'https://alvalenda-portfolio.vercel.app/',
      'flavio.alva@outlook.com',
    )
    .addTag('auth')
    .addTag('tasks')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3333;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
