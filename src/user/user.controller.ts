
import {
    Controller,
    Get,
    Post,
    Delete, Body, Param, UsePipes, ValidationPipe, UseGuards,
    Request,

} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { Any } from 'typeorm';
import { LocalAuthGuard } from '../auth/local-auth-guard';
import { UserDTO, UserRd } from './user.dto';
import { UserService } from './user.service';


@Controller()
export class UserController {
    constructor( private userService: UserService) { };
    @Get('/api/user')
    showAllUsers() {
        return this.userService.showAll();
    }



   
    @Post('/api/register')

    @UsePipes(new ValidationPipe())
    showOneUser(@Body() data: UserRd) {
        return this.userService.register(data);
    }

    //@Post('')
  ////  resetPassword(@Param('id') id: number, @Body() data: UserDTO) {
    //    return this.AuthService.resetPassword(id, data);
    //}
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }
    @Post('/api/byemail')
    //@UseGuards(JwtAuthGuard) 
    showByEmail(@Body() data:any){
        return this.userService.findbyEmail(data.email);

    }

    @Post('/api/forgot')
    forgotpass(@Body() data: any){
        return this.userService.forgotpassword(data.secret,data.newPassword,data.email)

    }

}

