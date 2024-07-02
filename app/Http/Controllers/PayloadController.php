<?php

namespace App\Http\Controllers;

use App\Models\Payload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Nette\Utils\Random;

class PayloadController extends Controller
{
    public function index()
    {
        $payload = null;

        if (isset($_COOKIE['payload'])) {
            $payload = json_decode($_COOKIE['payload'], true);
        } else {
            return redirect()->route('carts.index');
        }

        return Inertia::render('Payload', [
            'auth' => $payload['auth'],
            'total' => $payload['total'],
            'products' => $payload['products'],
            'payload' => $payload['payload']
        ]);
    }

    public function create(Request $req)
    {
        $obPayload = (new Payload)->setPixKey('cb238d65-c0ee-48a7-ad8b-d6d5ad7b907e')
            ->setDescription('Pagamento do Pedido Things Foods')
            ->setMerchantName('ThingsFoods')
            ->setMerchantCity('JOINVILLE')
            ->setAmount($req->total)
            ->setTxid('THINGSFOODS' . strtoupper(Random::generate()));

        $payload = $obPayload->getPayload();

        $cookies = [
            'auth' => Auth::user(),
            'total' => $req->total,
            'products' => $req->products,
            'payload' => $payload
        ];

        setcookie('payload', json_encode($cookies), time() + 600, "/");

        return Inertia::render('Payload', [
            'auth' => Auth::user(),
            'total' => $req->total,
            'products' => $req->products,
            'payload' => $payload
        ]);
    }
}
