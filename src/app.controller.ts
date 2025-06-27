import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  [x: string]: any;
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
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    };
  }

  @Post('db-check')
  async testConnection() {
    try {
      // Test raw SQL query
      const result = await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'success',
        message: 'Database connection works',
        result,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Database connection failed',
        error: error.message,
        stack: error.stack,
      };
    }
  }

  @Post('echo')
  echoTest(@Body() body: any) {
    return {
      status: 'success',
      message: 'Basic POST works',
      receivedData: body,
    };
  }
}
