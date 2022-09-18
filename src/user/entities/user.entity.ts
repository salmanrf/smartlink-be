import {
  AfterLoad,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  full_name: string;

  @Column({ type: 'varchar', length: 15, nullable: false, unique: true })
  username: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  session_uuid: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  @Check("REGEXP_LIKE(phone, '^[0-9]{10,15}$')")
  phone: string;

  @CreateDateColumn()
  created_at: Date | string;

  @UpdateDateColumn()
  updated_at: Date | string;
}
