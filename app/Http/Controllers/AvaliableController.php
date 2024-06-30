<?php

namespace App\Http\Controllers;

use App\Models\Avaliable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AvaliableController extends Controller
{
    public function create(Request $request)
    {
        $avaliabled = $request->all();
        $avaliabled['iduser'] = Auth::id();

        Avaliable::create($avaliabled);
    }
}
