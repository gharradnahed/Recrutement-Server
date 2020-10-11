import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { UserDTO, UserID } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { OffreService } from './offre.service';

@Controller('offre')
export class OffreController {
    constructor(private offreService: OffreService) { };
    @Get('/api/getoffre')
    showAllUsers() {
        return this.offreService.showAll();
    }

    
    @Post('/api/postOffre')
    @UseGuards( JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async createUserr(  @Body()  data: any) {
        return this.offreService.createUser(data);
    }
    @Delete('/api/deleteoffre/:id')
    async deleteOffre(@Param('id') id: string){
        return this.offreService.deleteOffre(id)
    }
  //  @Post()
//@UseGuards(JwtAuthenticationGuard)
//async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
 // return this.postsService.createPost(post, req.user);
//}

}

