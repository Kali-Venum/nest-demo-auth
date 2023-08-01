import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(loginDTO: LoginDTO): Promise<any> {
    const user = await this.authService.validateUser(loginDTO);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
