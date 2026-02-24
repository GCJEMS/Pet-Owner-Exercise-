import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Owner } from '../../owners/entities/owner.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => Owner, (owner) => owner.pets, { onDelete: 'CASCADE' })
  owner: Owner;
}