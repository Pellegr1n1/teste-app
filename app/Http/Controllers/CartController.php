<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Address;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Metodo utilizado para retornar todos os produtos ao carrinho
     * 
     */

    public function index()
    {
        $products = Product::all();
        $address = Address::where('iduser', Auth::id())->get();

        return Inertia::render('Cart', [
            'products' => $products,
            'address' => $address
        ]);
    }
}
