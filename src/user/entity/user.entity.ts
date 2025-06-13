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
import { AccessLvlEntity } from './access_lvl.entity';

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
}
