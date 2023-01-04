import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

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

  await app.listen(3333);
}
bootstrap();
