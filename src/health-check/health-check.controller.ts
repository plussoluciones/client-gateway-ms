import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthCheckController {
  @Get()
  health_check() {
    return 'ClientGateway is up and running!!';
  }
}
