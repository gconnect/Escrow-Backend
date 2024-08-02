import { Milestone, RequestStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class MilestoneEntity implements Milestone {
  constructor({ ...data }: Partial<MilestoneEntity>) {
    Object.assign(this, data);
  }

  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Title of the milestone',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the milestone',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  status: RequestStatus;

  @ApiProperty({
    description: 'Percentage payment per milestone',
  })
  @IsNumber()
  @IsNotEmpty()
  percent: number;

  @ApiProperty({
    description: 'Request Id associated with the Milestone',
  })
  @IsNumber()
  @IsNotEmpty()
  requestId: number;
  
  @ApiProperty({
    description: 'Date created',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date updated',
  })
  updatedAt: Date;
}
