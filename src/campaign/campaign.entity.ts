import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Article } from 'src/blog/article.entity';
import { CreateCampaignDto } from './dto/create_campaign.dto';
import { CampaignService } from './campaign.service';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column({
    default:
      'https://res.cloudinary.com/dgext7ewd/image/upload/v1594021601/Charity_And_Fundraising/upload/default/default_image_sieswh.jpg',
  })
  thumbnail: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column()
  slug: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_updated: Date;
}
