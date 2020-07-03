import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { RoleEnum } from './other/user_role.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  deleteById(id: number) {
    return (
      this.createQueryBuilder()
        .delete()
        // Dont permit delete admin account :))
        .where('id = :id AND role != :roleAdmin', {
          id,
          roleAdmin: RoleEnum.ADMIN,
        })
        .execute()
    );
  }
}
