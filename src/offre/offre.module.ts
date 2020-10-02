import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { OffreController } from './offre.controller';
import { Offre } from './offre.entity';
import { OffreService } from './offre.service';

@Module({
  
  imports: [TypeOrmModule.forFeature([Offre,User]),UserModule],
  controllers: [OffreController],
  providers: [OffreService]
})
export class OffreModule {}
