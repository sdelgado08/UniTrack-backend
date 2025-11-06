import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para el frontend
  app.enableCors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // Configurar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port, '0,0,0,0');
  
  console.log(`🚀 UniTrack Backend está ejecutándose en: http://localhost:${port}`);
  console.log(`📚 API disponible en: http://localhost:${port}/api`);
  console.log(`🏥 Health check en: http://localhost:${port}/api/health`);
}
bootstrap();
