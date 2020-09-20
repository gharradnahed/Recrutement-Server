import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offre } from './offre.entity';

@Injectable()
export class OffreService {
  constructor(@InjectRepository(Offre) private offerRepository :Repository<Offre>){};
    async showAll(){
        return await this.offerRepository.find();
    }
     async createUser(data:Partial <Offre>){
         const offre = await this.offerRepository.save(data);
         return offre;

     }
     async showOne(id:number){
        return await this.offerRepository.findOne({where :{id:id}});

    }
    // async updateUser(id:number ,data:Partial <OffreDTO>){
    //      await this.offerRepository.update({id},data);
    //     return await this.offerRepository.findOne({id});
    // }
    async deleteUser(id:number) { 
        await this.offerRepository.delete(id);
        return(true);
    }

}