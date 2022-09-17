import {
  AfterLoad,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('services')
export class Service {
  @AfterLoad()
  humanizeUuuid() {
    this.uuid = this.uuid_txt;
    delete this.uuid_txt;
  }

  @PrimaryColumn('uuid')
  uuid: string;

  @Column({ type: 'uuid' })
  uuid_txt: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  @Check("unit IN ('kg', 'pcs', 'cm', 'm2')")
  unit: string;

  @Column({ type: 'decimal', precision: 16, scale: 2, nullable: false })
  price: number;

  @CreateDateColumn()
  created_at: Date | string;

  @UpdateDateColumn()
  updated_at: Date | string;
}
