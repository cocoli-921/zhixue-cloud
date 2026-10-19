import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('system')
@Controller()
export class HealthController {
  @Get('health')
  health() {
    return { status: 'ok', service: 'zhixue-cloud-backend', sprint: 'Sprint 1' };
  }
}
