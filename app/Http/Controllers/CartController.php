<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Address;
use App\Models\Category;
use App\Models\Order;
use App\Models\Avaliable;
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

        $orders = Order::where('iduser', Auth::id())->with('items')->get();

        $avaliables = Avaliable::whereIn('idorder', $orders->pluck('id'))->get();

        $ratingsCount = [];

        // Calculando a média de avaliação para cada produto
        foreach ($products as $product) {
            $totalRating = 0;
            $count = 0;

            foreach ($orders as $order) {
                foreach ($order->items as $item) {
                    if ($item->idproduct == $product->id) {
                        $avaliation = $avaliables->where('idorder', $order->id)->first();
                        if ($avaliation) {
                            $totalRating += $avaliation->value;
                            $count++;
                        }
                    }
                }
            }

            // Calculando a média das avaliações
            if ($count > 0) {
                $product->rating = $totalRating / $count;
            } else {
                $product->rating = 0;
            }

            $ratingsCount[$product->id] = $count;
        }

        return Inertia::render('Cart', [
            'products' => $products,
            'address' => $address,
            'categories' => $categories,
            'ratingsCount' => $ratingsCount
        ]);
    }
}
