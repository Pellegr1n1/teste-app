<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'document' => '111.111.111-11',
                'name' => 'Client',
                'email' => 'client@gmail.com',
                'type' => 'client',
                'password' => Hash::make('engsoft2024')
            ],
            [
                'document' => '11.111.111/1111-11',
                'name' => 'Company',
                'email' => 'company@gmail.com',
                'type' => 'company',
                'password' => Hash::make('engsoft2024')
            ]
        ]);
    }
}
