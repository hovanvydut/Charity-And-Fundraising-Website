import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform<any> {
  private logger = new Logger();

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
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
