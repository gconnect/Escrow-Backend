import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { CreateUserEoaDto } from './create-userEOA.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  constructor(create: CreateUserEoaDto) {
    super();
  }
  @ApiProperty()
  smartWalletAddress: string;
}
