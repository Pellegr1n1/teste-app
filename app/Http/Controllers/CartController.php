<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Address;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Metodo utilizado para retornar todos os produtos ao carrinho
     * 
     */
    public function index()
    {
        $products = Product::with(['category:id,nmcategory,color', 'user:id,document,name,email', 'address:id,street,number,city,state,neighborhood'])->get();
        $address = Address::where('iduser', Auth::id())->get();
        $categories = Category::all();

        return Inertia::render('Cart', [
            'products' => $products,
            'address' => $address,
            'categories' => $categories
        ]);
    }
}
