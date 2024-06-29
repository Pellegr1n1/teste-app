<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class DashboardCompanyController extends Controller
{
    public function index() {
        $products = Product::with('category:id,color')->get();

        return Inertia::render('DashboardCompany', [
            'products' => $products
        ]);
    }
}
