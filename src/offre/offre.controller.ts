import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OffreService } from './offre.service';

@Controller('offre')
export class OffreController {
    constructor(private offreService: OffreService) { };
    @Get()
    showAllUsers() {
        return this.offreService.showAll();
    }
    @Post()
    createUserr(@Body() data: OffreDTO) {
        return this.offreService.createUser(data);
    }
    @Get(':id')
    showOneUser(@Param('id') id: number) {
        return this.offreService.showOne(id);
    }

    
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.offreService.deleteUser(id);
    }
}

