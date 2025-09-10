import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Meeting } from '@/meetings/meeting.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: true })
  active: boolean;

 @Column({ unique: true, nullable: true })
googleId: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Meeting, meeting => meeting.user)
  meetings: Meeting[];
}
