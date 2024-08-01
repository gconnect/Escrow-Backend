import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dtos/create-request.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { MilestoneEntity } from '../milestones/entities/milestone.entity';
import { RequestEntity } from './entities/request.entity';
import { CustomException } from 'src/utils/custom.exception';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async create(createRequestDto: CreateRequestDto) {
    try {
      const dateCompleted = new Date(createRequestDto.completionDate);
      console.log(dateCompleted);
      const request = await this.prisma.request.create({
        data: {
          completionDate: dateCompleted,
          ...createRequestDto,
        },
      });
      return new RequestEntity(request);
    } catch (error) {
      throw new CustomException('Error creating request', error);
    }
  }

  async findAll() {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
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
      throw new CustomException('Could not update request', error);
    }
  }

  async remove(id: number) {
    try {
      return new RequestEntity(
        await this.prisma.request.delete({ where: { id } }),
      );
    } catch (error) {
      throw new CustomException('Could not remove request', error);
    }
  }

  async removeAll() {
    try {
      return this.prisma.request.deleteMany();
    } catch (error) {
      throw new Error(error);
    }
  }
}
