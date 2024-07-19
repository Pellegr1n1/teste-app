<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $products = Product::with(['category:id,nmcategory,color', 'user:id,document,name,email,image'])
                            ->where('fgenabled', 1)
                            ->get();
        $categories = Category::all();

        return Inertia::render('Welcome', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}
