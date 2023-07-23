import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'short_title' })
  shortTitle: string;

  @Column({ name: 'long_title' })
  longTitle: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'image_url' })
  imageURL: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
