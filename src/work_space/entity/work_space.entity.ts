import { ProjectEntity } from 'src/project/entity/project.entity';
import { UserEntity } from 'src/user/entity/user.entity';
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

@Entity('work_space')
export class WorkSpaceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @Index()
  user_id: string;

  @ManyToOne(() => UserEntity, (user) => user.work_space)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => ProjectEntity, (proj) => proj.work_space)
  project : ProjectEntity;
}
