// app.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';
import { CreateUserDto } from './supabase/user.dto';

@Injectable()
export class AppService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return this.supabaseService.createUser(createUserDto);
  }
}
