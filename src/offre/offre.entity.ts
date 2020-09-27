import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Offre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
  @Column()

    specialite: string;
    @Column()

    typeOffre: string;


}