import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.getUserByEmail(email);

    if (user === undefined) {
      throw new UnauthorizedException();
    } else {
      if (user.password === password) {
        return user;
      } else {
        throw new UnauthorizedException();
      }
    }
  }
}
