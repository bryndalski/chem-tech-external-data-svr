import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ATS - admin ')
    .setDescription('Admin swagger for ATS project')
    .setVersion('1.1')
    .addTag('Api', 'Admin')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app as any, swaggerConfig);
  SwaggerModule.setup(
    `${config.get('DATA_SERVER_PREFIX')}/docs`,
    app as any,
    document,
  );
  await app.listen(config.get('PORT'));
}
bootstrap();
