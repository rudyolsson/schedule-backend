import { BaseEntity, Column } from 'typeorm';

export abstract class TraceableEntity extends BaseEntity {
  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  created: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated: number;

  @Column({ type: 'timestamp', nullable: true, select: false })
  delete: number;
}
