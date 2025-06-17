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

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  due_date: string;

  @Column()
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @Index()
  user_id: string;

  @Column()
  @Index()
  project_id: string;

  @ManyToOne(() => UserEntity, (user) => user.task)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (proj) => proj.task)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: ProjectEntity;
}
