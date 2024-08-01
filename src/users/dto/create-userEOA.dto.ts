import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserEoaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  eoaAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  privateKey: string;

  @IsString()
  // @IsNotEmpty()
  @ApiProperty()
  smartWalletAddress?: string;
}
