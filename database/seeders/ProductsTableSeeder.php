<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            // Bebida (id 1)
            ['nmproduct' => 'Refrigerante', 'qtproduct' => 100, 'price' => 5.99, 'iduser' => 2, 'idcategory' => 1, 'image' => 'uploads/562883-refrigerante.png', 'fgenabled' => 1],
            ['nmproduct' => 'Cerveja', 'qtproduct' => 150, 'price' => 4.99, 'iduser' => 2, 'idcategory' => 1, 'image' => 'uploads/392533-cerveja.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Vinho', 'qtproduct' => 50, 'price' => 29.99, 'iduser' => 2, 'idcategory' => 1, 'image' => 'uploads/958439-vinho.jpg', 'fgenabled' => 1],
            ['nmproduct' => 'Água Mineral', 'qtproduct' => 200, 'price' => 1.99, 'iduser' => 2, 'idcategory' => 1, 'image' => 'uploads/184268-agua.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Suco de Laranja', 'qtproduct' => 120, 'price' => 3.99, 'iduser' => 2, 'idcategory' => 1, 'image' => 'uploads/848990-suco_laranja.webp', 'fgenabled' => 1],

            // Comida (id 2)
            ['nmproduct' => 'Pizza', 'qtproduct' => 30, 'price' => 19.99, 'iduser' => 2, 'idcategory' => 2, 'image' => 'uploads/962705-pizza.jpg', 'fgenabled' => 1],
            ['nmproduct' => 'Hambúrguer', 'qtproduct' => 50, 'price' => 9.99, 'iduser' => 2, 'idcategory' => 2, 'image' => 'uploads/69198-hamburger.jpg', 'fgenabled' => 1],
            ['nmproduct' => 'Batata Frita', 'qtproduct' => 100, 'price' => 4.99, 'iduser' => 2, 'idcategory' => 2, 'image' => 'uploads/124510-batata_frita.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Sushi', 'qtproduct' => 40, 'price' => 29.99, 'iduser' => 2, 'idcategory' => 2, 'image' => 'uploads/653567-sushi.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Sorvete', 'qtproduct' => 70, 'price' => 7.99, 'iduser' => 2, 'idcategory' => 2, 'image' => 'uploads/893343-sorvete.png', 'fgenabled' => 1],

            // Eletrônicos (id 3)
            ['nmproduct' => 'Smartphone', 'qtproduct' => 20, 'price' => 999.99, 'iduser' => 2, 'idcategory' => 3, 'image' => 'uploads/457295-smartphone.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Laptop', 'qtproduct' => 15, 'price' => 1999.99, 'iduser' => 2, 'idcategory' => 3, 'image' => 'uploads/244911-laptop.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Tablet', 'qtproduct' => 25, 'price' => 499.99, 'iduser' => 2, 'idcategory' => 3, 'image' => 'uploads/148669-tablet.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Fone de Ouvido', 'qtproduct' => 50, 'price' => 99.99, 'iduser' => 2, 'idcategory' => 3, 'image' => 'uploads/214557-fone_ouvido.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Câmera', 'qtproduct' => 10, 'price' => 799.99, 'iduser' => 2, 'idcategory' => 3, 'image' => 'uploads/986103-camera.webp', 'fgenabled' => 1],

            // Roupas (id 4)
            ['nmproduct' => 'Camiseta', 'qtproduct' => 100, 'price' => 19.99, 'iduser' => 2, 'idcategory' => 4, 'image' => 'uploads/758889-camiseta.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Jeans', 'qtproduct' => 80, 'price' => 39.99, 'iduser' => 2, 'idcategory' => 4, 'image' => 'uploads/75904-jeans.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Jaqueta', 'qtproduct' => 50, 'price' => 59.99, 'iduser' => 2, 'idcategory' => 4, 'image' => 'uploads/192618-jaqueta.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Tênis', 'qtproduct' => 70, 'price' => 79.99, 'iduser' => 2, 'idcategory' => 4, 'image' => 'uploads/139902-tenis.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Boné', 'qtproduct' => 100, 'price' => 14.99, 'iduser' => 2, 'idcategory' => 4, 'image' => 'uploads/666080-bone.webp', 'fgenabled' => 1],

            // Livros (id 5)
            ['nmproduct' => 'Livro de Ficção', 'qtproduct' => 60, 'price' => 29.99, 'iduser' => 2, 'idcategory' => 5, 'image' => 'uploads/696821-livro_ficcao.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Livro de Ciência', 'qtproduct' => 40, 'price' => 49.99, 'iduser' => 2, 'idcategory' => 5, 'image' => 'uploads/948082-livro_ciencia.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Livro de História', 'qtproduct' => 30, 'price' => 39.99, 'iduser' => 2, 'idcategory' => 5, 'image' => 'uploads/742495-livro_historia.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Livro Infantil', 'qtproduct' => 80, 'price' => 19.99, 'iduser' => 2, 'idcategory' => 5, 'image' => 'uploads/530528-livro_infantil.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Livro de Autoajuda', 'qtproduct' => 50, 'price' => 24.99, 'iduser' => 2, 'idcategory' => 5, 'image' => 'uploads/182168-livro_autoajuda.webp', 'fgenabled' => 1],

            // Brinquedos (id 6)
            ['nmproduct' => 'Boneca', 'qtproduct' => 70, 'price' => 19.99, 'iduser' => 2, 'idcategory' => 6, 'image' => 'uploads/231062-boneca.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Carrinho', 'qtproduct' => 100, 'price' => 14.99, 'iduser' => 2, 'idcategory' => 6, 'image' => 'uploads/321450-carrinho.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Quebra-Cabeça', 'qtproduct' => 60, 'price' => 24.99, 'iduser' => 2, 'idcategory' => 6, 'image' => 'uploads/260983-quebra_cabeca.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Jogo de Tabuleiro', 'qtproduct' => 40, 'price' => 29.99, 'iduser' => 2, 'idcategory' => 6, 'image' => 'uploads/601719-jogo_tabuleiro.jpg', 'fgenabled' => 1],
            ['nmproduct' => 'Lego', 'qtproduct' => 50, 'price' => 49.99, 'iduser' => 2, 'idcategory' => 6, 'image' => 'uploads/660191-lego.jpg', 'fgenabled' => 1],

            // Móveis (id 7)
            ['nmproduct' => 'Mesa', 'qtproduct' => 20, 'price' => 199.99, 'iduser' => 2, 'idcategory' => 7, 'image' => 'uploads/785188-mesa.jpg', 'fgenabled' => 1],
            ['nmproduct' => 'Cadeira', 'qtproduct' => 30, 'price' => 49.99, 'iduser' => 2, 'idcategory' => 7, 'image' => 'uploads/226242-cadeira.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Sofá', 'qtproduct' => 10, 'price' => 399.99, 'iduser' => 2, 'idcategory' => 7, 'image' => 'uploads/781213-sofa.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Cama', 'qtproduct' => 15, 'price' => 299.99, 'iduser' => 2, 'idcategory' => 7, 'image' => 'uploads/442829-cama.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Estante', 'qtproduct' => 25, 'price' => 99.99, 'iduser' => 2, 'idcategory' => 7, 'image' => 'uploads/589826-estante.webp', 'fgenabled' => 1],

            // Ferramentas (id 8)
            ['nmproduct' => 'Martelo', 'qtproduct' => 50, 'price' => 19.99, 'iduser' => 2, 'idcategory' => 8, 'image' => 'uploads/557378-martelo.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Chave de Fenda', 'qtproduct' => 70, 'price' => 9.99, 'iduser' => 2, 'idcategory' => 8, 'image' => 'uploads/912604-chave_fenda.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Alicate', 'qtproduct' => 60, 'price' => 14.99, 'iduser' => 2, 'idcategory' => 8, 'image' => 'uploads/60555-alicate.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Serrote', 'qtproduct' => 40, 'price' => 24.99, 'iduser' => 2, 'idcategory' => 8, 'image' => 'uploads/945859-serrote.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Furadeira', 'qtproduct' => 30, 'price' => 49.99, 'iduser' => 2, 'idcategory' => 8, 'image' => 'uploads/8353-furadeira.webp', 'fgenabled' => 1],

            // Beleza (id 9)
            ['nmproduct' => 'Shampoo', 'qtproduct' => 80, 'price' => 14.99, 'iduser' => 2, 'idcategory' => 9, 'image' => 'uploads/749553-shampoo.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Condicionador', 'qtproduct' => 70, 'price' => 14.99, 'iduser' => 2, 'idcategory' => 9, 'image' => 'uploads/963896-condicionador.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Creme Hidratante', 'qtproduct' => 60, 'price' => 19.99, 'iduser' => 2, 'idcategory' => 9, 'image' => 'uploads/778921-creme_hidratante.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Maquiagem', 'qtproduct' => 50, 'price' => 29.99, 'iduser' => 2, 'idcategory' => 9, 'image' => 'uploads/546253-maquiagem.png', 'fgenabled' => 1],
            ['nmproduct' => 'Perfume', 'qtproduct' => 40, 'price' => 49.99, 'iduser' => 2, 'idcategory' => 9, 'image' => 'uploads/148802-perfume.webp', 'fgenabled' => 1],

            // Esportes (id 10)
            ['nmproduct' => 'Bola de Futebol', 'qtproduct' => 50, 'price' => 29.99, 'iduser' => 2, 'idcategory' => 10, 'image' => 'uploads/687864-bola_futebol.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Raquete de Tênis', 'qtproduct' => 30, 'price' => 99.99, 'iduser' => 2, 'idcategory' => 10, 'image' => 'uploads/546708-raquete_tenis.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Bicicleta', 'qtproduct' => 20, 'price' => 499.99, 'iduser' => 2, 'idcategory' => 10, 'image' => 'uploads/314302-bicicleta.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Capacete', 'qtproduct' => 60, 'price' => 59.99, 'iduser' => 2, 'idcategory' => 10, 'image' => 'uploads/89761-capacete.webp', 'fgenabled' => 1],
            ['nmproduct' => 'Luvas de Boxe', 'qtproduct' => 40, 'price' => 39.99, 'iduser' => 2, 'idcategory' => 10, 'image' => 'uploads/83532-luvas_boxe.webp', 'fgenabled' => 1],
        ];

        DB::table('products')->insert($products);
    }
}
