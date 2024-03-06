<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartamentosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('departamentos')->insert([
            ['id' => 5, 'departamento'=> 'ANTIOQUIA'],
            ['id' => 8, 'departamento'=> 'ATLÁNTICO'],
            ['id' => 11, 'departamento'=> 'BOGOTÁ, D.C.'],
            ['id' => 13, 'departamento'=> 'BOLÍVAR'],
            ['id' => 15, 'departamento'=> 'BOYACÁ'],
            ['id' => 17, 'departamento'=> 'CALDAS'],
            ['id' => 18, 'departamento'=> 'CAQUETÁ'],
            ['id' => 19, 'departamento'=> 'CAUCA'],
            ['id' => 20, 'departamento'=> 'CESAR'],
            ['id' => 23, 'departamento'=> 'CÓRDOBA'],
            ['id' => 25, 'departamento'=> 'CUNDINAMARCA'],
            ['id' => 27, 'departamento'=> 'CHOCÓ'],
            ['id' => 41, 'departamento'=> 'HUILA'],
            ['id' => 44, 'departamento'=> 'LA GUAJIRA'],
            ['id' => 47, 'departamento'=> 'MAGDALENA'],
            ['id' => 50, 'departamento'=> 'META'],
            ['id' => 52, 'departamento'=> 'NARIÑO'],
            ['id' => 54, 'departamento'=> 'NORTE DE SANTANDER'],
            ['id' => 63, 'departamento'=> 'QUINDIO'],
            ['id' => 66, 'departamento'=> 'RISARALDA'],
            ['id' => 68, 'departamento'=> 'SANTANDER'],
            ['id' => 70, 'departamento'=> 'SUCRE'],
            ['id' => 73, 'departamento'=> 'TOLIMA'],
            ['id' => 76, 'departamento'=> 'VALLE DEL CAUCA'],
            ['id' => 81, 'departamento'=> 'ARAUCA'],
            ['id' => 85, 'departamento'=> 'CASANARE'],
            ['id' => 86, 'departamento'=> 'PUTUMAYO'],
            ['id' => 88, 'departamento'=> 'ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA'],
            ['id' => 91, 'departamento'=> 'AMAZONAS'],
            ['id' => 94, 'departamento'=> 'GUAINÍA'],
            ['id' => 95, 'departamento'=> 'GUAVIARE'],
            ['id' => 97, 'departamento'=> 'VAUPÉS'],
            ['id' => 99, 'departamento'=> 'VICHADA'],
        ]);
    }
}
