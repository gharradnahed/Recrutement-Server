
import {
    Controller,
    Get,
    Post,
    Delete, Body, Param, UsePipes, ValidationPipe, UseGuards,
    Request,

} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
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

    /*@Put(':id')
    updateUSer(@Param('id') id: number, @Body() data: UserDTO) {
        return this.userService.updateUser(id, data);
    }*/
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }


}

