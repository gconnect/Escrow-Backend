import { Module } from '@nestjs/common';
import { MilestonesController } from './milestones.controller';
import { MilestonesService } from './milestones.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestsService } from 'src/requests/requests.service';

@Module({
  controllers: [MilestonesController],
  providers: [MilestonesService, PrismaService, RequestsService],
})
export class MilestonesModule {}
