import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column({
    default:
      'https://res.cloudinary.com/dgext7ewd/image/upload/v1594021601/Charity_And_Fundraising/upload/default/default_image_sieswh.jpg',
  })
  thumbnail: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_updated: Date;

  @ManyToOne(
    type => User,
    user => user.articles,
    { eager: false, nullable: false },
  )
  author: User;
}
