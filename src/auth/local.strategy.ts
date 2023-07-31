import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  validate(email: string, password: string): User {
    const user: User = this.usersService.getUserByEmail(email);
    if (user === undefined || !user || user === null) {
      throw new UnauthorizedException();
    } else {
      if (user.password === password) {
        return user;
      }else {
        throw new UnauthorizedException();
      }
    }
  }
}
