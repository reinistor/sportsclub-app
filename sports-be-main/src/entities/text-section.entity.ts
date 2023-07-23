import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('text_sections')
export class TextSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'type', unique: true })
  type: string;

  @Column({ name: 'content' })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
