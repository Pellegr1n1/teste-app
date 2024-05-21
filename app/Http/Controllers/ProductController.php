<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;



class ProductController extends Controller
{

    /**
     * Metodo utilizado para retornar todos os produtos relacionados 
     * ao usuario logado.
     * 
     */

    public function index()
    {
        $userId = Auth::id();

        $products = Product::where('iduser', $userId)->get();
        $categories = Category::all();

        return Inertia::render('Product', [
            'products' => $products,
            'categories' => $categories
        ]);
    }


    /**
     * Metodo utilizado para criar um produto
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        $file_name = rand(0, 999999) . '-' . $request->file('image')->getClientOriginalName();
        $path = $request->file('image')->storeAs('uploads', $file_name, 'public');

        $data = $request->all();
        $data['image'] = $path;

        Product::create($data);
        return redirect()->route('products.index');
    }

    /**
     * Metodo utilizado para deletar UM produto.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        $imagePath = $product->image;

        $product->delete();

        if ($imagePath) {
            Storage::disk('public')->delete($imagePath);
        }

        return redirect()->route('products.index')->with('success', 'Produto excluído com sucesso.');
    }
}
