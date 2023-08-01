import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/list')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Post('/create')
  async createAUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.usersService.createAUser(createUserDTO);
  }

  @Get('/:userId')
  async getAUserById(@Param('userId') userId: number) {
    return await this.usersService.getAUserById(userId);
  }
}
