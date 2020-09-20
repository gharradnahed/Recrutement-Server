import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
/*import { MigrationInterface, QueryRunner,TableColumn} from 'typeorm';*/
import  {hash,compare} from 'bcrypt';
import  jwt from 'jsonwebtoken';
import { UserDTO } from './user.dto';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nom: string;
    @Column()
    prenom: string;
    @Column({unique: true})
    email: string;
    @Column()
    password: string;
    @Column()
    adresse: string;
    @Column()
    age: number;
    @Column()
    sex: string;
    @Column()
    city: string;
    @Column()
    state: string;
    @Column()
    specialite: string;
    @Column()
    phoneNumber: number;
    
    @Column()
    type: string;

    @BeforeInsert()
    async hashpassword() {
        this.password = await hash(this.password, 10);
    }
    async comparePassword(attempt: string): Promise<boolean> {
        return await compare(attempt, this.password);
    }

   toResponseObject():UserDTO{
     /*because we don't wnant to send the password to the client and make it easy to hack */
       const { id, nom, prenom,email,phoneNumber } = this;
        const responseObject:any ={id, nom, prenom,email,phoneNumber };
       
    
        return responseObject;
      }
}

