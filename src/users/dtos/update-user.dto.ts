import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { CreateUserEoaDto } from './create-userEOA.dto';
import { Sex } from '@prisma/client';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  constructor(create: CreateUserEoaDto) {
    super();
  }
  @ApiProperty()
  smartWalletAddress: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  sex: Sex;

  @ApiProperty()
  address: string;
}
