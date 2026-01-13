import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET'],
  });
  app.setGlobalPrefix('taskflow-pro');
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);

  console.log('🚀 Server running on http://localhost:' + PORT);
  console.log('📚 API available at http://localhost:' + PORT + '/taskflow-pro');
}
bootstrap();
