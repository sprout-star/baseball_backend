// app.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';
import { CreateUserDto } from './supabase/user.dto';

@Injectable()
export class AppService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return await this.supabaseService.createUser(createUserDto);
  }

  async getAllUsers(): Promise<any> {
    return await this.supabaseService.getAllUsers();
  }
}
