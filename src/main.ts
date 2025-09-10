import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Strip properties not in DTO
      forbidNonWhitelisted: true, // Throw error if unknown fields are sent
      transform: true,            // Auto-transform payloads to DTO instances
    }),
  );

  // ✅ Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',               // frontend local dev
      'https://your-frontend.vercel.app'     // deployed frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ✅ Dynamic port for Render/production, default 3001 for local
  const port = process.env.PORT ?? 3001;
  await app.listen(port);

  console.log(`Backend running on port ${port}`);
}

bootstrap();
