<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Método utilizado para retornar todos os produtos ao dashboard
     */
    public function index()
    {
        $products = Product::with('category:id,nmcategory,color', 'user:id,document,name,email')->get();

        // Fetch top 3 best-selling products
        $topProducts = $this->getTopSellingProducts(3);

        return Inertia::render('Dashboard', [
            'products' => $products,
            'topProducts' => $topProducts,
        ]);
    }

    /**
     * Retrieve the top N best-selling products.
     *
     * @param int $limit
     * @return \Illuminate\Support\Collection
     */
    private function getTopSellingProducts($limit = 3)
    {
        return Product::select('products.*', 'categories.nmcategory', 'categories.color', DB::raw('SUM(order_items.qtproduct) as total_sold'))
            ->join('order_items', 'products.id', '=', 'order_items.idproduct')
            ->join('categories', 'products.idcategory', '=', 'categories.id')
            ->groupBy('products.id', 'categories.id', 'categories.nmcategory', 'categories.color')
            ->orderByDesc('total_sold')
            ->limit($limit)
            ->get();
    }
}
