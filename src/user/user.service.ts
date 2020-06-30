import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    try {
      await this.userRepository.insert(createUserDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
