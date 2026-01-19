import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      configService.get<string>('FRONTEND_URL'),
      /\.vercel\.app$/, //regex to allow all vercel domains
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET'],
  });

  app.setGlobalPrefix('taskflow-pro');
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT, '0.0.0.0'); //This means listen on all available network interfaces.

  console.log('');
  console.log('🚀 Server running on http://localhost:' + PORT);
  console.log('📚 API available at http://localhost:' + PORT + '/taskflow-pro');
  console.log('🗄️  DB: ' + configService.get<string>('DATABASE_NAME'));
}
bootstrap();
