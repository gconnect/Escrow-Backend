import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { MilestoneEntity } from '../milestones/entities/milestone.entity';
import { RequestEntity } from '../request/entities/request.entity';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  // Add more request-related methods as needed
  async create(createRequestDto: CreateRequestDto) {
    const dateCompleted = new Date(createRequestDto.completionDate);
    console.log(dateCompleted);
    const request = await this.prisma.request.create({
      data: {
        completionDate: dateCompleted,
        ...createRequestDto,
      },
    });
    new RequestEntity(request);
  }

  async findAll() {
    const requests = this.prisma.request.findMany({
      include: {
        milestones: true,
        client: true,
        freelancer: true,
      },
    });
    return (await requests).map((request) => {
      return new RequestEntity({
        ...request,
        client: new UserEntity(request.client),
        freelancer: new UserEntity(request.freelancer),
        milestones: request.milestones.map(
          (milestone) => new MilestoneEntity(milestone),
        ),
      });
    });
  }

  async findOne(id: number) {
    const request = await this.prisma.request.findUnique({
      where: { id },
      include: {
        milestones: true,
        client: true,
        freelancer: true,
      },
    });
    if (!request) {
      throw new NotFoundException(`Request with ${id} does not exist.`);
    }
    return new RequestEntity({
      ...request,
      client: new UserEntity(request.client),
      freelancer: new UserEntity(request.freelancer),
      milestones: request.milestones.map(
        (milestone) => new MilestoneEntity(milestone),
      ),
    });
  }

  async update(id: number, updates: { [key: string]: any }) {
    try {
      const updatedRequest = await this.prisma.request.update({
        where: { id },
        data: {
          ...updates,
        },
        include: {
          milestones: true,
        },
      });
      console.log('Updated request:', updatedRequest);
      return new RequestEntity(updatedRequest);
    } catch (error) {
      console.error('Error updating request:', error);
      throw new Error('Could not update request');
    }
  }

  async remove(id: number) {
    return new RequestEntity(
      await this.prisma.request.delete({ where: { id } }),
    );
  }

  async removeAll() {
    return this.prisma.request.deleteMany();
  }
}
