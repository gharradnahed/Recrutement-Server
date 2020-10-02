import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {User} from '../user/user.entity'
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

    @ManyToOne(() => User, (author: User) => author.offre)
    public author: User;
  }

