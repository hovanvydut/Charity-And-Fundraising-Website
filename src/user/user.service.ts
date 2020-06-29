import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }
}
