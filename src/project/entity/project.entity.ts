import { TaskEntity } from 'src/task/entity/task.entity';
import { WorkSpaceEntity } from 'src/work_space/entity/work_space.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @Index()
  work_space_id: string;

  @OneToMany(() => TaskEntity, (task) => task.project)
  task: TaskEntity;

  @ManyToOne(() => WorkSpaceEntity, (work_space) => work_space.project)
  @JoinColumn({ name: 'work_space_id', referencedColumnName: 'id' })
  work_space: WorkSpaceEntity;
}
