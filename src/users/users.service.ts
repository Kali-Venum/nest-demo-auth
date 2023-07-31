import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  public users: User[] = [
    {
      email: 'email1@email.com',
      password: 'admin',
      age: 10,
    },
    {
      email: 'email2@email.com',
      password: 'admin',
      age: 20,
    },
    {
      email: 'email2@email.com',
      password: 'admin',
      age: 30,
    },
  ];

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
