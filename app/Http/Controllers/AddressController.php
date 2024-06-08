<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{

    public function create(Request $request)
    {
        // Valida request
        $validatedData = $request->validate([
            'cep' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'neighborhood' => 'required|string|max:255',
            'number' => 'required|string|max:255'
        ]);

        Address::create($validatedData);
    }
}
