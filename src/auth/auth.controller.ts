import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authServices.validateUser(loginDTO);
  }
}
