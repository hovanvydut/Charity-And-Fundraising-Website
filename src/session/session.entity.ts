import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryColumn({ type: 'character varying' })
  sid: string;

  @Column({ type: 'json' })
  sess: string;

  @Column({ type: 'timestamp without time zone' })
  expire: string;
}
