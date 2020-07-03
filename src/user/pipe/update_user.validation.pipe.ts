import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserValidationPipe implements PipeTransform<any> {
  private logger = new Logger();

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    if (value.password) {
      const salt = await bcrypt.genSalt();
      value.password = await bcrypt.hash(value.password, salt);
    } else {
      delete value.password;
    }

    value.role = Number(value.role);
    if (!value.avatar) delete value.avatar;

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      this.logger.error(errors, null, 'CreateUserValidationPipe');
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
