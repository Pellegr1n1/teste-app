<?php

namespace App\Http\Controllers;

use App\Models\Payload;
use Mpdf\QrCode\QrCode;
use Mpdf\QrCode\Output;
use Nette\Utils\Random;

class PayloadController extends Controller
{
    public function create()
    {
        $obPayload = (new Payload)->setPixKey('cb238d65-c0ee-48a7-ad8b-d6d5ad7b907e')
            ->setDescription('Pagamento do Pedido Things Foods')
            ->setMerchantName('ThingsFoods')
            ->setMerchantCity('JOINVILLE')
            ->setAmount(1000000.00)
            ->setTxid('THINGSFOODS' . strtoupper(Random::generate()));

        $payloadQrCode = $obPayload->getPayload();

        $obQrCode = new QrCode($payloadQrCode);

        $image = (new Output\Png)->output($obQrCode, 400);

        header('Content-Type: image/png');

        echo $image;
    }
}
