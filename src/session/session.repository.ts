import { Repository, EntityRepository } from 'typeorm';
import { Session } from './session.entity';

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
}
