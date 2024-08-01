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

@Injectable()
export class MilestonesService {
  constructor(
    private prisma: PrismaService,
    private requests: RequestsService,
  ) {}

  // Add more request-related methods as needed
  async create(createMilestonDto: CreateMilestoneDto) {
    const requests = await this.requests.findAll();
    const request = requests.find(
      (request) => request.id == createMilestonDto.requestId,
    );
    console.log(request);

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
  }

  async findAll() {
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
  }

  async findOne(id: number) {
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
      throw new Error('Could not update request');
    }
  }

  async remove(id: number) {
    return new MilestoneEntity(
      await this.prisma.milestone.delete({ where: { id } }),
    );
  }

  async removeAll() {
    return this.prisma.milestone.deleteMany();
  }
}
