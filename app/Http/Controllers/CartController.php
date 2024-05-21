<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;


class CartController extends Controller
{
    /**
     * Metodo utilizado para retornar todos os produtos ao carrinho
     * 
     */

    public function index()
    {
        $products = Product::all();

        return Inertia::render('Cart', [
            'products' => $products,
        ]);
    }
}
