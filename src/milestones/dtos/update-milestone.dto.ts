import { RequestStatus } from '@prisma/client';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateMilestoneDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  percent: number;

  status: RequestStatus;

  @IsNumber()
  @IsNotEmpty()
  requestId: number;
}
