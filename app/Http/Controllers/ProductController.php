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
     * Retorna todos os produtos relacionados ao usuário logado.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $userId = Auth::id();
        $products = Product::where('iduser', $userId)->with('category:id,color,nmcategory')->get();
        $categories = Category::all();

        return Inertia::render('Product', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * Cria um novo produto.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'nmproduct' => 'required',
            'qtproduct' => 'required',
            'price' => 'required',
            'idcategory' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // ajuste conforme suas necessidades de validação
        ]);

        $file_name = time() . '-' . $request->file('image')->getClientOriginalName();
        $path = $request->file('image')->storeAs('uploads', $file_name, 'public');

        $data = $request->all();
        $data['iduser'] = Auth::id();
        $data['image'] = $path;

        Product::create($data);

        return redirect()->route('products.index')
            ->with('success', 'Produto criado com sucesso.');
    }

    /**
     * Remove um produto existente.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Produto não encontrado.');
        }

        Storage::disk('public')->delete($product->image);

        $product->delete();

        return redirect()->route('products.index')->with('success', 'Produto excluído com sucesso.');
    }
}
