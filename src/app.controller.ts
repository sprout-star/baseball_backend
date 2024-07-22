// app.controller.ts
import { Controller, Post, Get, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './supabase/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/insert')
  @UseInterceptors(FileInterceptor('picture'))
  async insertUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() picture: Express.Multer.File
  ) {

    // Combine non-file data with file URL (or handle as needed)
    const userData = { ...createUserDto, picture: picture };

    return this.appService.createUser(userData);
  }

  @Get('/list')
  async getAllUsers() {
    const users = await this.appService.getAllUsers();
    return users;
  }
}