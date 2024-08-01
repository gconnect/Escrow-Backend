import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMilestoneDto } from 'src/milestones/dtos/create-milestone.dto';
import { MilestoneEntity } from 'src/milestones/entities/milestone.entity';
import { RequestsService } from 'src/requests/requests.service';
import { CustomException } from 'src/utils/custom.exception';

@Injectable()
export class MilestonesService {
  constructor(
    private prisma: PrismaService,
    private requests: RequestsService,
  ) {}

  async create(createMilestonDto: CreateMilestoneDto) {
    try {
      const requests = await this.requests.findAll();
      const request = requests.find(
        (request) => request.id == createMilestonDto.requestId,
      );
      if (!request.isMilestone) {
        throw new HttpException(
          'Error creating milestone, Request milestone is set to false',
          HttpStatus.BAD_REQUEST,
        );
      }
      const milestone = await this.prisma.milestone.create({
        data: {
          ...createMilestonDto,
        },
      });
      new MilestoneEntity(milestone);
    } catch (error) {
      throw new CustomException('Error creating milestone', error);
    }
  }

  async findAll() {
    try {
      const milestones = this.prisma.milestone.findMany({
        include: {
          request: true,
        },
      });
      return (await milestones).map((milestone) => {
        return new MilestoneEntity({
          ...milestone,
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const milestone = await this.prisma.milestone.findUnique({
        where: { id },
        include: {
          request: true,
        },
      });
      if (!milestone) {
        throw new NotFoundException(`Request with ${id} does not exist.`);
      }
      return new MilestoneEntity({
        ...milestone,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updates: { [key: string]: any }) {
    try {
      const updatedMilestone = await this.prisma.milestone.update({
        where: { id },
        data: {
          ...updates,
        },
        include: {
          request: true,
        },
      });
      console.log('Updated request:', updatedMilestone);
      return new MilestoneEntity(updatedMilestone);
    } catch (error) {
      console.error('Error updating request:', error);
      throw new CustomException('Could not update request', error);
    }
  }

  async remove(id: number) {
    try {
      return new MilestoneEntity(
        await this.prisma.milestone.delete({ where: { id } }),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeAll() {
    try {
      return this.prisma.milestone.deleteMany();
    } catch (error) {
      throw new Error(error);
    }
  }
}
