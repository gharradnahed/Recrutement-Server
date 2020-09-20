import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Offre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
  @Column()

    specialite_demmandée: string;
    @Column()

    type_offre: string;

  
}