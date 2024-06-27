<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['nmcategory' => 'Bebida', 'tax' => 14, 'iduser' => 2, 'color' => '#00BFFF'],
            ['nmcategory' => 'Comida', 'tax' => 10, 'iduser' => 2, 'color' => '#FF4500'],
            ['nmcategory' => 'Eletrônicos', 'tax' => 20, 'iduser' => 2, 'color' => '#8A2BE2'],
            ['nmcategory' => 'Roupas', 'tax' => 12, 'iduser' => 2, 'color' => '#FF69B4'],
            ['nmcategory' => 'Livros', 'tax' => 5, 'iduser' => 2, 'color' => '#FFD700'],
            ['nmcategory' => 'Brinquedos', 'tax' => 8, 'iduser' => 2, 'color' => '#FF6347'],
            ['nmcategory' => 'Móveis', 'tax' => 18, 'iduser' => 2, 'color' => '#A52A2A'],
            ['nmcategory' => 'Ferramentas', 'tax' => 15, 'iduser' => 2, 'color' => '#2E8B57'],
            ['nmcategory' => 'Beleza', 'tax' => 16, 'iduser' => 2, 'color' => '#FF1493'],
            ['nmcategory' => 'Esportes', 'tax' => 12, 'iduser' => 2, 'color' => '#1E90FF'],
        ]);
    }
}
