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
//import { MailerModule } from '@nestjs-modules/mailer';
//import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
//import { Mailer.Module.TsModule } from './mailer/';
//import { MaileModule } from './mailer/mailer.module';


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
  /*OffreModule,
  MailerModule.forRootAsync({
    useFactory: () => ({
      transport: {
        host: 'localhost',
        port: 1025,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>'    },
        preview: true,

      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
   /}),
  }),
 // Mailer.Module.TsModule,
  MaileModule,
],*/
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  constructor(private connection: Connection) {}
}
