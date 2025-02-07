import { ApiProperty } from '@nestjs/swagger';
import { User, UserEOAAccount, Sex } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

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

  @ApiProperty()
  eoaAccount: UserEOAAccount;

  @ApiProperty()
  requests: Request[];
}
