import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/auth.dto';

@Injectable()
export class AuthService { 
  constructor(private usersServices: UsersService) {}

  async validateUser(loginDTO: LoginDTO) {
    const user = await this.usersServices.findAUserByEmail(loginDTO.email);

    if (user && user.password === loginDTO.password) {
      return user;
    } else {
      return null;
    }
  }
}
