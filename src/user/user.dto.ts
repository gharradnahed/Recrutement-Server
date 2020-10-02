import { IsNotEmpty } from 'class-validator'
import { Column } from 'typeorm';
export class UserDTO {
    nom: string;
    prenom: string;
    email: string;
    phoneNumber: number;
    adresse: string;
    age: number;
    sex: string;
    city: string;
    state: string;
    specialite: string;
    password: string;
    secret: string;
    questionNumber: string;
}



export class UserRd {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class UserID {

    id:number
}