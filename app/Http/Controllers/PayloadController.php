<?php

namespace App\Http\Controllers;

use App\Models\Payload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Mpdf\QrCode\QrCode;
use Mpdf\QrCode\Output;
use Nette\Utils\Random;

class PayloadController extends Controller
{
    public function create(Request $req)
    {
        $obPayload = (new Payload)->setPixKey('cb238d65-c0ee-48a7-ad8b-d6d5ad7b907e')
            ->setDescription('Pagamento do Pedido Things Foods')
            ->setMerchantName('ThingsFoods')
            ->setMerchantCity('JOINVILLE')
            ->setAmount($req->total)
            ->setTxid('THINGSFOODS' . strtoupper(Random::generate()));

        $payload = $obPayload->getPayload();

        return Inertia::render('Payload', [
            'auth' => Auth::user(),
            'total' => $req->total,
            'payload' => $payload
        ]);
    }
}
