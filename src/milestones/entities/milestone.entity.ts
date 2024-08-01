import { Milestone } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class MilestoneEntity implements Milestone {
  constructor({ ...data }: Partial<MilestoneEntity>) {
    Object.assign(this, data);
  }

  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Description of the milestone',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

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
}
