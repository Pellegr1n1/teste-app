<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function create(Request $req)
    {
        // Cria um novo pedido
        $newOrder = Order::create([
            "total" => $req->total,
            "tax" => $req->tax,
            "iduser" => Auth::id()
        ]);

        // Cria os items do pedido
        if ($req->has('products')) {
            foreach ($req->products as $product) {
                OrderItem::create([
                    'nmproduct' => $product['nmproduct'],
                    'price' => $product['price'],
                    'qtproduct' => $product['qtproduct'],
                    'idcategory' => $product['idcategory'],
                    'idorder' => $newOrder->id,
                    'iduser' => Auth::id(),
                    'idproduct' => $product['id']
                ]);
                $this->updateProductStock($product['id'], $product['qtproduct']);
            }
        }

        return redirect()->route('historic.index');
    }

    private function updateProductStock($productId, $quantity)
    {
        $product = Product::find($productId);

        if ($product) {
            $newStock = $product->qtproduct - $quantity;
            $product->update(['qtproduct' => $newStock]);
        }
    }
}
