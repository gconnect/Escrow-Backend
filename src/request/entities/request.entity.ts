import { Milestone, Request, RequestStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';
import { Transform, Type } from 'class-transformer';
import { MilestoneEntity } from 'src/milestones/entities/milestone.entity';

export class RequestEntity implements Request {
  constructor(partial: Partial<RequestEntity>) {
    Object.assign(this, partial);
  }

  @IsNumber()
  id: number;

  // @ApiProperty({ description: 'Client id' })
  @IsNumber()
  clientId: number;

  // @ApiProperty({ description: 'Freelancer id' })
  @IsNumber()
  freelancerId: number;

  // @ApiProperty({ description: 'Type of service' })
  @IsString()
  @IsNotEmpty()
  serviceType: string;

  // @ApiProperty({ description: 'Service description with' })
  @IsString()
  @IsNotEmpty()
  projectDescription: string;

  // @ApiProperty({ description: 'Amount for the requested service' })
  @IsNumber()
  amount: number;

  // @ApiProperty({ description: 'Status of the request' })
  @Transform(({ value }) => (value === undefined ? 0 : value))
  status: RequestStatus;

  // @ApiProperty({ description: 'Provide additional links about the project' })
  @IsArray()
  @IsString({ each: true })
  // @IsOptional()
  additionalDocLinks: string[];

  // @ApiProperty({
  //   description: 'Do you want to make payment base on milestones?',
  // })
  @IsBoolean()
  @Transform(({ value }) => (value === undefined ? false : value))
  isMilestone: boolean;

  // @ApiProperty({ description: 'What is definition of done for this request' })
  @IsString()
  @IsNotEmpty()
  definitionOfDone: string;

  // @ApiProperty({ description: 'How many revisions are required?' })
  @IsNumber()
  @IsNotEmpty()
  revisions: number;

  // @ApiProperty({ description: 'When is the expected completion date?' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  completionDate: Date;

  // @ApiProperty({ description: 'Client info' })
  client: UserEntity;

  // @ApiProperty({ description: 'Freelancer info' })
  freelancer: UserEntity;

  milestones: Milestone[];

  // @ApiProperty()
  createdAt: Date;

  // @ApiProperty()
  updatedAt: Date;
}
