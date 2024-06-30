<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;

class HistoricController extends Controller
{
    public function index()
    {
        $orders = Order::with('items')->get();

        return Inertia::render('Historic', [
            'orders' => $orders
        ]);
    }
}
