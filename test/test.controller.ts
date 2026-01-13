import { Get, Controller } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  getTest() {
    return {
      message: 'Hello from Test Controller',
      timestamp: new Date().toISOString(),
    };
  }
}
