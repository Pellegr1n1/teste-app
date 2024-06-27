<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
            'number' => 'required|string|max:255',
        ]);

        $validatedData['iduser'] = Auth::id();

        Address::create($validatedData);
    }

    public function destroy($id)
    {
        Address::destroy($id);
    }
}
