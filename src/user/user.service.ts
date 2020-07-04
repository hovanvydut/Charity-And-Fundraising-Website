import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update_user.dto';
import { RoleEnum } from './other/user_role.enum';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class UserService {
  private logger = new Logger();
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private sessionService: SessionService,
  ) {}

  async findOne(condition = {}): Promise<User | undefined> {
    return this.userRepository.findOne(condition);
  }

  async createUser(createUserDto: CreateUserDto, currentUser: User) {
    if (createUserDto.role === RoleEnum.ADMIN)
      throw new Error('Bạn không được phép tạo một ADMIN khác');

    if (
      currentUser.role === RoleEnum.MOD &&
      createUserDto.role === RoleEnum.MOD
    )
      throw new Error('Bạn không có quyền tạo MOD');

    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    try {
      await this.userRepository.insert(createUserDto);
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('phone'))
          throw new Error('Số điện thoại đã tồn tại');

        throw new Error('Email đã tồn tại');
      } else {
        this.logger.error(error.message, error.trace, 'createUser-service');
        throw new Error('Lỗi phía server');
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

  async updateUser(
    idOfUserNeedUpdate: number,
    updateUserDto: UpdateUserDto,
    user: User,
  ) {
    const userNeedUpdate = await this.findOne({ id: idOfUserNeedUpdate });

    if (!userNeedUpdate) throw new Error('User not exist');

    if (user.role === RoleEnum.ADMIN) {
      if (idOfUserNeedUpdate === user.id) {
        delete updateUserDto.role;
        return await this.userRepository.update({ id: user.id }, updateUserDto);
      }

      if (userNeedUpdate.role === RoleEnum.ADMIN)
        throw new Error('Bạn không được phép tạo một ADMIN khác');

      await this.userRepository.update(
        { id: idOfUserNeedUpdate },
        updateUserDto,
      );
      return await this.sessionService.destroyByUserId(idOfUserNeedUpdate);
    }

    if (user.role === RoleEnum.MOD) {
      if (userNeedUpdate.id === user.id) {
        delete updateUserDto.role;
        return await this.userRepository.update({ id: user.id }, updateUserDto);
      }

      if (
        userNeedUpdate.role === RoleEnum.ADMIN ||
        userNeedUpdate.role === RoleEnum.MOD
      )
        throw new Error('Bạn không được phép cập nhật MOD hoặc ADMIN khác');

      await this.userRepository.update(
        { id: idOfUserNeedUpdate },
        updateUserDto,
      );
      return await this.sessionService.destroyByUserId(idOfUserNeedUpdate);
    }

    if (
      user.role != RoleEnum.ADMIN &&
      user.role != RoleEnum.MOD &&
      idOfUserNeedUpdate === user.id
    ) {
      return await this.userRepository.update(
        { id: idOfUserNeedUpdate },
        updateUserDto,
      );
    }

    throw new Error('Lỗi! Vui lòng liên hệ với BQT để có cách khắc phục');
  }

  async deleteUser(idOfUserNeedDelete: number, currentUser: User) {
    const userNeedDelete = await this.findOne({ id: idOfUserNeedDelete });

    if (!userNeedDelete) throw new Error('User not exist');

    if (currentUser.role === RoleEnum.ADMIN) {
      if (userNeedDelete.role === RoleEnum.ADMIN)
        throw new Error('Bạn không được phép xóa ADMIN');
      if (idOfUserNeedDelete !== currentUser.id)
        return this.userRepository.deleteById(idOfUserNeedDelete);
      else throw new Error('Bạn không được xóa chính bạn');
    }

    if (currentUser.role === RoleEnum.MOD) {
      if (userNeedDelete.role === RoleEnum.ADMIN)
        throw new Error('Bạn không được phép xóa ADMIN');

      if (idOfUserNeedDelete === currentUser.id)
        throw new Error('Bạn không được xóa chính bạn');

      if (userNeedDelete.role === RoleEnum.MOD)
        throw new Error('Bạn không thể xóa MOD');

      return this.userRepository.deleteById(idOfUserNeedDelete);
    }

    if (
      currentUser.role != RoleEnum.ADMIN &&
      currentUser.role != RoleEnum.MOD &&
      idOfUserNeedDelete === currentUser.id
    ) {
      throw new Error('Bạn không được xóa chính bạn');
    }

    throw new Error('Lỗi! Vui lòng liên hệ với BQT để có cách khắc phục');
  }
}
