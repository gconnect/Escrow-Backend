import { RequestStatus } from '@prisma/client';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateMilestoneDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  percent: number;

  @IsNumber()
  @IsNotEmpty()
  requestId: number;

}
