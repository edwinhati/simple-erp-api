import { Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async register() {
    return await this.usersService.create({
      name: 'Edwin Hati',
      username: 'edwinhati',
      email: 'edwinhati@outlook.com2',
      password: 'testing',
    });
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
  @Get(':email')
  async findOne(@Param('email') email: string) {
    return await this.usersService.findOne(email);
  }
}
