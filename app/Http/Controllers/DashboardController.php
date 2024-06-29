<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;

class DashboardController extends Controller
{
    /**
     * Metodo utilizado para retornar todos os produtos ao dashboard
     * 
     */

    public function index()
    {
        $products = Product::with('category:id,nmcategory,color')->get();

        return Inertia::render('Dashboard', [
            'products' => $products,
        ]);
    }
}
