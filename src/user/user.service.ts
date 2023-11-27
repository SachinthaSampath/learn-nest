import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import User from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: any) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException('User with the email does not exist', HttpStatus.NOT_FOUND);
  }
  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async createUser(user: CreateUserDto) {
    const newUser = await this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: any, user: UpdateUserDto) {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOne(id);
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: any) {
    const deletedResponse = await this.userRepository.delete(id);
    if (!deletedResponse.affected) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
  async getById(id: any) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }
}
