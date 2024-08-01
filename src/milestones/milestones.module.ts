import { Module } from '@nestjs/common';
import { MilestonesController } from './milestones.controller';
import { MilestonesService } from './milestones.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestService } from 'src/request/request.service';

@Module({
  controllers: [MilestonesController],
  providers: [MilestonesService, PrismaService, RequestService],
})
export class MilestonesModule {}
