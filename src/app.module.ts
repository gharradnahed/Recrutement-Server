import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { OffreModule } from './offre/offre.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot({
    type: 'mysql',
    port: 3306,
    password: '',
    database: 'recruitement',
    host: 'localhost',
    username:'root',
    logging:true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }), UserModule, AuthModule,OffreModule],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  constructor(private connection: Connection) {}
}
