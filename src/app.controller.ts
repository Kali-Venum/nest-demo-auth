import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import passport from 'passport';
import { clearScreenDown } from 'readline';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async register(@Body() body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    return this.appService.register({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.appService.findOne(body.email);

    if (!user) {
      throw new BadRequestException();
    } else {
      const comparedPassword = await bcrypt.compare(
        body.password,
        user.password,
      );

      if (!comparedPassword) {
        throw new BadRequestException();
      } else {
        return user;
      }
    }
  }
}
