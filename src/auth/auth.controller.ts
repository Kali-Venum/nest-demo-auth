import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @Post('/login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authServices.validateUser(loginDTO);
  }
}
