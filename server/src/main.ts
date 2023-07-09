import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(AppModule, {
    logger:
      config.get('NODE_ENV') !== 'production'
        ? ['error', 'warn', 'debug', 'verbose', 'log']
        : ['error', 'warn', 'log'],
  });
  app.setGlobalPrefix(config.get('DATA_SERVER_PREFIX'));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('LabRat - external data server - dev panel')
    .setDescription(
      'External data privider microservice. Connects to external provider: PUBCHEM.',
    )
    .setVersion('1.1')
    .addTag('Labrat', 'external data server')
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
void bootstrap();
