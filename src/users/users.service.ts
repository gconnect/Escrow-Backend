import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ethers } from 'ethers';
import { User } from '.prisma/client';
import { UserEntity } from './entities/user.entity';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const wallet = ethers.Wallet.createRandom();
    const eoaAddress = wallet.address;
    const privateKey = wallet.privateKey;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    createUserDto.password = hashedPassword;
    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword, // Ensure this is hashed before storing
        eoaAccount: {
          create: {
            eoaAddress,
            privateKey,
            smartWalletAddress: '',
          },
        },
      },
    });
    return new UserEntity(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        eoaAccount: true,
        freelancerRequests: true,
        clientRequests: true,
      },
    });
    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        eoaAccount: true,
        clientRequests: true,
        freelancerRequests: true,
      },
    });
    return new UserEntity(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    updates: { [key: string]: any },
  ) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }
    console.log('Updating user with data:', {
      id,
      updateUserDto,
    });
    try {
      // const { smartWalletAddress } = updateUserDto;
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          eoaAccount: {
            update: {
              where: { id },
              data: {
                smartWalletAddress: updates.smartWalletAddress,
              },
            },
          },
        },
        include: {
          eoaAccount: true,
        },
      });

      console.log('Updated user:', updatedUser);
      return new UserEntity(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Could not update user');
    }
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id },
      include: { eoaAccount: true },
    });
    return new UserEntity(user);
  }
}
