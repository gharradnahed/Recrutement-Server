import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO, UserRd } from './user.dto';
import { User } from './user.entity';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { };
    async showAll():Promise< UserDTO[]> {
        const users = await this.userRepository.find();
        return users.map(user => user.toResponseObject());
    }
    async login(data: UserRd) {
        const { email, password } = data;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user.toResponseObject();
    }
    async register(data: UserRd){
        const { email } = data;
        let user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject();
    }


    async deleteUser(id: number) {
        await this.userRepository.delete(id);
        return (true);

    }

    async forgotpassword(secret: any, newPassword: any,email: any){
        const user= await this.userRepository.findOne({email: email})
        const secretAnswer= user.secret;
        if(secretAnswer===secret){
            user.password=newPassword;
            await this.userRepository.save(user)
            return true
        }
        return false
    }
    async findbyEmail(email: string) {
        return await  this.userRepository.findOne({email});
    }

    async getAllEntreprises() {
        return await this.userRepository.find({type: "ENTREPRISE"})
    }

    async getAllUsers() {
        return await this.userRepository.find({type: "USER"})
    }
   
}
