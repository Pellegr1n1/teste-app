<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;

class HistoricController extends Controller
{
    public function index()
    {
        $orders = Order::with('items', 'avaliables')->get();
        $unavaliatedOrders = $orders->filter(function ($order) {
            return $order->avaliables->isEmpty();
        })->pluck('id')->toArray();

        return Inertia::render('Historic', [
            'orders' => $orders,
            'unavaliatedOrders' => $unavaliatedOrders,
        ]);
    }
}
