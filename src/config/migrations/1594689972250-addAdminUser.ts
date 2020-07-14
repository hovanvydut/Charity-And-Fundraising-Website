import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAdminUser1594689972250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO user (adress, avatar, email, name, password, phone, role) 
        VALUES ("Việt Nam", "http://res.cloudinary.com/dgext7ewd/image/upload/v1594394451/Charity_And_Fundraising/upload/avatar/acrscnbbkyj3whvhcfhe.jpg", "hovanvydut@gmail.com", "Super ADMIN", "$2y$12$50vkO4kj.6QNK1EroaKHVO/EeOWBYOTD1qHuF/NRYiVLuOAaq3Wfm", "0961882993", 1)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM user WHERE email = "hovanvydut@gmail.com"`,
    );
  }
}
