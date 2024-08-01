import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateMilestoneDto {
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
