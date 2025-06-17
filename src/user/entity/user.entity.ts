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
import { AccessLvlEntity } from './access_lvl.entity';
import { WorkSpaceEntity } from 'src/work_space/entity/work_space.entity';
import { TaskEntity } from 'src/task/entity/task.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  @Index()
  access_lvl_id: string;

  @Column({ default: 'dark' })
  theme: string;

  @Column({ default: 'normal' })
  ui_size: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => AccessLvlEntity, (access_lvl) => access_lvl.user)
  @JoinColumn({ name: 'access_lvl_id', referencedColumnName: 'id' })
  access_permissions: AccessLvlEntity;

  @OneToMany(() => WorkSpaceEntity, (work_space) => work_space.user)
  work_space: WorkSpaceEntity;

  @OneToMany(() => TaskEntity, (task) => task.user)
  task: TaskEntity;
}
