import { ApiProperty } from '@nestjs/swagger';
import { RequestStatus } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ description: 'Client id' })
  @IsNumber()
  clientId: number;

  @ApiProperty({ description: 'Freelancer id' })
  @IsNumber()
  freelancerId: number;

  @ApiProperty({ description: 'Amount for the requested service' })
  @IsNumber()
  amount: number;

  // @ApiProperty({ description: 'Status of the request' })
  @Transform(({ value }) => (value === undefined ? 0 : value))
  status: RequestStatus;

  @ApiProperty({ description: 'Type of service' })
  @IsString()
  @IsNotEmpty()
  serviceType: string;

  @ApiProperty({ description: 'Service description with' })
  @IsString()
  @IsNotEmpty()
  projectDescription: string;

  @ApiProperty({ description: 'Provide additional links about the project' })
  @IsNotEmpty()
  @IsString({ each: true })
  additionalDocLinks: string[];

  @ApiProperty({
    description: 'Do you want to make payment base on milestones?',
  })
  @IsBoolean()
  @Transform(({ value }) => (value === undefined ? false : value))
  isMilestone: boolean;

  @ApiProperty({ description: 'What is definition of done for this request' })
  @IsString()
  @IsNotEmpty()
  definitionOfDone: string;

  @ApiProperty({ description: 'How many revisions are required?' })
  @IsNumber()
  @IsNotEmpty()
  revisions: number;

  @ApiProperty({ description: 'When is the expected completion date?' })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  completionDate: Date;
}
