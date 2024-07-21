import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreateUserDto } from './user.dto';
import { v4 as uuidv4 } from 'uuid';
import { readFile } from 'fs/promises';
import { decode } from 'base64-arraybuffer'

const supabaseUrl = 'https://gcgstbdcbrjrllpqxdor.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZ3N0YmRjYnJqcmxscHF4ZG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1MTkxMDcsImV4cCI6MjAzNzA5NTEwN30.cpFJ6nNQMlZnwtoqM0r5mJZdNXk-Qg3PKEzYWFbEF9Y';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(supabaseUrl, supabaseKey);
    }

    async uploadPicture(file: any): Promise<string> {
        const filePath = file.path; // Use file.path to read the file from disk
        const fileName = `${uuidv4()}.${file.originalname.split('.').pop()}`;

        // Read the file from disk
        const fileBuffer = await readFile(filePath);

        const { data, error } = await this.supabase.storage
            .from('picture') // Ensure 'pictures' is the correct storage bucket name
            .upload(`public/${fileName}`, fileBuffer, {
                contentType: 'image/png'
            });


        if (error) {
            throw new Error(`Error uploading picture: ${error.message}`);
        }

        // Generate and return the public URL
        const { data: publicUrlData } = this.supabase.storage
            .from('picture')
            .getPublicUrl(`public/${fileName}`);

        if (!publicUrlData || !publicUrlData.publicUrl) {
            throw new Error('Error generating public URL');
        }

        return publicUrlData.publicUrl;
    }

    async createUser(createUserDto: CreateUserDto): Promise<any> {
        const { picture, ...userData } = createUserDto;

        let pictureUrl = '';
        if (picture) {
            pictureUrl = await this.uploadPicture(picture);
        }

        const { data, error } = await this.supabase
            .from('User')
            .insert([{ ...userData, picture: pictureUrl }]);

        if (error) {
            throw new Error(`Error saving data to User: ${error.message}`);
        }

        return data;
    }
}