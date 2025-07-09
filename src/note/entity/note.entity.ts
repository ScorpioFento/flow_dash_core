import { ProjectEntity } from 'src/project/entity/project.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @Index()
  project_id: string;

  @Column()
  @Index()
  user_id: string;

  @ManyToOne(() => ProjectEntity, (project) => project.note)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, (user) => user.note)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
