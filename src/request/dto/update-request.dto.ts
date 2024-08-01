import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-request.dto';
import { Transform, Type } from 'class-transformer';
import { Milestone, RequestStatus } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRequestDto {
  @IsNumber()
  clientId: number;

  @IsNumber()
  freelancerId: number;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  serviceType: string;

  @IsString()
  @IsNotEmpty()
  projectDescription: string;

  @IsNotEmpty()
  @IsString({ each: true })
  additionalDocLinks: string[];

  @IsBoolean()
  @Transform(({ value }) => (value === undefined ? false : value))
  isMilestone: boolean;

  @IsString()
  @IsNotEmpty()
  definitionOfDone: string;

  @IsNumber()
  @IsNotEmpty()
  revisions: number;

  @ApiProperty()
  @Transform(({ value }) => (value === undefined ? 0 : value))
  status: RequestStatus;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  completionDate: Date;

  // @ApiProperty()
  // milestones: Milestone[];
}
