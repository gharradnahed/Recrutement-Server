import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as crypto from "crypto";
import nodemailer from "nodemailer";
import {User} from "../user/user.entity"
import { from } from 'rxjs';
import  {hashSync,compare} from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findbyEmail(username);
    if (user && await user.comparePassword(password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, };
    let type= await this.usersService.findbyEmail(user.email);
    return {
      access_token: this.jwtService.sign(payload),
      type:type.type,
    };
  }
  async forgotPassword(user) {
    const username = user.email;
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        return(err)
      }
      const payload = { username: user.email, sub: user.id, };

      const token = this.jwtService.sign(payload)

    
              if (!username) {
      return ({ error: "User dont exists with that email" })
    }
    let testAccount =  nodemailer.createTestAccount();
    //function(user, token, done) {
      user.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function(err, new_user) {
        console.log(new_user);
      });
   // }
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
    transporter.verify(function(error, success) {
      if (error) {
           console.log(error);
      } else {
           console.log('Server is ready to take our messages');
      }
   });
    user.save().then((result) => {
      transporter.sendMail({
        to: user.email,
        from: "no-replay@insta.com",
        subject: "password reset",
    
      })
      return(  "check your email" );
    });

  });
 
  }
 /* reset_password = function(req, res, next) {
    
    User.findOne({
      reset_password_token: req.body.token,
      reset_password_expires: {
        $gt: Date.now()
      }
    }).exec(function(err, user) {
      if (!err && user) {
        if (req.body.newPassword === req.body.verifyPassword) {
          user.hash_password = hashSync(req.body.newPassword, 10);
          user.reset_password_token = undefined;
          user.reset_password_expires = undefined;
          user.save(function(err) {
            if (err) {
              return res.status(422).send({
                message: err
              });
            } else {
              var data = {
                to: user.email,
                from: "no-replay@insta.com",
                template: 'reset-password-email',
                subject: 'Password Reset Confirmation',
                context: {
                  name: user.fullName.split(' ')[0]
                }
              };
  
              Transporter.sendMail(data, function(err) {
                if (!err) {
                  return res.json({ message: 'Password reset' });
                } else {
                  return (err);
                }
              });
            }
          });
        } else {
          return res.status(422).send({
            message: 'Passwords do not match'
          });
        }
      } else {
        return res.status(400).send({
          message: 'Password reset token is invalid or has expired.'
        });
      }
    });
}*/
}