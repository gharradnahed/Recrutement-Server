import { IsNotEmpty } from 'class-validator'
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
}



export class UserRd {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}