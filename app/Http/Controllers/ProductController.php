<?php

namespace App\Http\Controllers;

use App\Models\Address;
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
        $products = Product::where('iduser', $userId)->with(['category:id,nmcategory,color'])->get();
        $address = Address::where('iduser', $userId)->get();

        $categories = Category::all();

        return Inertia::render('Product', [
            'products' => $products,
            'categories' => $categories,
            'address' => $address
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
            'fgenabled' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $file_name = time() . '-' . $request->file('image')->getClientOriginalName();
        $path = $request->file('image')->storeAs('uploads', $file_name, 'public');

        $data = $request->all();
        // Definindo dados
        $data['iduser'] = Auth::id();
        $data['image'] = $path;

        Product::create($data);

        return redirect()->route('products.index')
            ->with('success', 'Produto criado com sucesso.');
    }
    /**
     * Pega os dados do produto para realizar a edição.
     *
     * @param int $id do produto
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function edit($id)
    {
        $userId = Auth::id();
        $product = Product::with('category')->find($id);

        if ($product) {
            $products = Product::where('iduser', $userId)->with(['category:id,nmcategory,color'])->get();
            $address = Address::where('iduser', $userId)->get();
            $categories = Category::all();

            return Inertia::render('Product', [
                'product' => $product,
                'products' => $products,
                'categories' => $categories,
                'address' => $address
            ]);
        } else {
            return redirect()->route('products.index')
                ->with('error', 'Erro ao puxar os dados do produto.');
        }
    }

    /**
     * Atualiza os dados de um produto.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id do produto
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nmproduct' => 'required',
            'qtproduct' => 'required',
            'price' => 'required',
            'fgenabled' => 'required',
            'idcategory' => 'required',
        ]);

        $product = Product::find($id);

        $product->update($validatedData);

        return redirect()->route('products.index')->with('success', 'Produto atualizado com sucesso!');
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
