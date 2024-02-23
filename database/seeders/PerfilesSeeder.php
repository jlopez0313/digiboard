<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PerfilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('perfiles')->insert(
        [
            'perfil' => 'SuperAdmin',
            'slug' => 'Super',
        ],
        [
            'perfil' => 'admin',
            'slug' => 'admin',
        ],
        [
            'perfil' => 'Gestor',
            'slug' => 'gestor',
        ]);
    }
}
