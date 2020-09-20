
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth-guard';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { };
    
    @UseGuards(LocalAuthGuard)
    @Post('/auth/login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/test')
    test() {
        return "Hello"
    }
}


