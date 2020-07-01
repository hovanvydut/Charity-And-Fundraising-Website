import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update_user.dto';

@Injectable()
export class UserService {
  private readonly users: User[];
  private logger = new Logger();
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async findOne(condition = {}): Promise<User | undefined> {
    return this.userRepository.findOne(condition);
  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    try {
      await this.userRepository.insert(createUserDto);
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('phone'))
          throw new ConflictException('Phone number already exists');

        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  getUsers(condition = {}) {
    return this.userRepository
      .createQueryBuilder()
      .select(['id', 'email', 'name', 'phone', 'address', 'avatar', 'role'])
      .where({ ...condition })
      .execute();
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }
}
