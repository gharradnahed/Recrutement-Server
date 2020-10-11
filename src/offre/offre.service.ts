import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO, UserID } from 'src/user/user.dto';
import { OffreDTO } from './offre.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Offre } from './offre.entity';
import { UserService } from '../user/user.service';
import { IsEmail } from 'class-validator';

@Injectable()
export class OffreService {
  constructor(@InjectRepository(Offre) private offreRepository :Repository<Offre>,private usersService: UserService, @InjectRepository(User) private userRepository:Repository<User>){};
  async showAll() {
 
  
    return this.offreRepository.find({ relations: ['author'] });  

}
     async createUser(data:OffreDTO){
       let email=data.email;

       const user=await this.usersService.findbyEmail(email)
       const offreData={typeOffre:data.typeOffre,description:data.description,id:data.id, specialite:data.specialite,author:user}
       const offre = this.offreRepository.create(offreData);
          await this.offreRepository.save(offre);
         return offre;

     }
     async getPostById(id: number) {
        const post = await this.offreRepository.findOne(id, { relations: ['author'] });
        if (post) {
          return post;
        }
        throw new NotFoundException(id);
      }
       
      async updatePost(id: number, offre:OffreDTO ) {
        await this.offreRepository.update(id, offre);
        const updatedPost = await this.offreRepository.findOne(id, { relations: ['author'] });
        if (updatedPost) {
          return updatedPost
        }
        throw new NotFoundException(id);
      }

      async deleteOffre(id:string) { 
        await this.offreRepository.delete(id);
        return(true);
    } 

}