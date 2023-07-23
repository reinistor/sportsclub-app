import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('club-members')
export class ClubMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default:
      'https://static.vecteezy.com/system/resources/previews/002/984/350/original/volleyball-girl-player-hits-the-ball-free-vector.jpg',
  })
  image: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'nationality' })
  nationality: string;

  @Column()
  position: string;

  @Column({ name: 'birth_date' })
  birthDate: string;

  @Column({ name: 'height' })
  height: string;

  @Column()
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
