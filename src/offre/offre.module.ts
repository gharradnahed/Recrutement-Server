import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffreController } from './offre.controller';
import { Offre } from './offre.entity';
import { OffreService } from './offre.service';

@Module({
  
  imports: [TypeOrmModule.forFeature([Offre])],
  controllers: [OffreController],
  providers: [OffreService]
})
export class OffreModule {}
