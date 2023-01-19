import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { serverConstants } from './common/constants/constants';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  process.env.NODE_ENV === 'development'
    ? app.enableCors()
    : (app.enableCors({ origin: serverConstants.origin }),
      logger.log(`Accepting requests from origin "${serverConstants.origin}"`));

  const swaggerConfig = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = serverConstants.port;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
