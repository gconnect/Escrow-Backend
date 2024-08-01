import { ApiProperty } from '@nestjs/swagger';
import { UserEOAAccount } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { UserEntity } from './user.entity';

export class UserEoaEntity implements UserEOAAccount {
  constructor({ user, ...data }: Partial<UserEoaEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
  }

  @ApiProperty()
  id: number;

  @ApiProperty({ required: false, nullable: true })
  userId: number;

  @ApiProperty()
  eoaAddress: string;

  @Exclude()
  privateKey: string;

  @ApiProperty()
  smartWalletAddress: string;

  @ApiProperty({ required: false, type: UserEntity })
  user?: UserEntity;
}
