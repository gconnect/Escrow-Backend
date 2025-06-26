import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

@Get('health')
getHealth() {
  return { 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'nestjs-app'
  };
}
}
