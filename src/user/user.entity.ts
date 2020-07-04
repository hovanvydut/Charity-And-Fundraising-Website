import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { randomAvatar } from './other/random_avatar';
import { Article } from 'src/blog/article.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  address: string;

  @Column({ nullable: true, default: randomAvatar() })
  avatar: string;

  @Column()
  role: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_updated: Date;

  @OneToMany(
    type => Article,
    article => article.author,
  )
  articles: Article[];
}
