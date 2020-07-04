import { Repository, EntityRepository } from 'typeorm';
import { Session } from './session.entity';
import { UpdateUserDto } from 'src/user/dto/update_user.dto';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
  deleteByUserId(id: number): Promise<any> {
    return this.createQueryBuilder('session')
      .delete()
      .where('session.sess ::jsonb @> :sess', {
        sess: {
          passport: {
            user: {
              id,
            },
          },
        },
      })
      .execute();
  }

  // updateByUserId(id: number, updateUserDto: UpdateUserDto): Promise<any> {
  //   return this.createQueryBuilder('session')
  //     .update({ sess: JSON.stringify(updateUserDto) })
  //     .where('session.sess ::jsonb @> :sess', {
  //       sess: {
  //         passport: {
  //           user: {
  //             id,
  //           },
  //         },
  //       },
  //     })
  //     .execute();
  // }
}
