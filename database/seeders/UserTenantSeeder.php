<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('users')->insert([
            'is_admin' => 'Y',
            'name' => 'administrador',
            'email' => 'admin@correo.com',
            'password' => \Hash::make('123456'),
        ]);
    }
}
