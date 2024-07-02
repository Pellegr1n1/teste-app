<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Metodo utilizado para retornar todas as categorias relacionadas
     * ao usuario logado.
     *
     */
    public function index()
    {
        $userId = Auth::id();

        $categories = Category::where('iduser', $userId)->get();

        return Inertia::render('Category', [
            'categories' => $categories,
        ]);
    }

    /**
     * Metodo utilizado para criar uma categoria
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nmcategory' => 'required|unique:categories',
            'tax' => 'required',
            'color' => 'required'
        ]);
        
        Category::create($request->all());

        return redirect()->route('categories.index')
            ->with('success', 'Category created successfully.');
    }

    /**
     * Metodo utilizado ao efetuar a edição.
     * @param int
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = Category::find($id);
        $categories = Category::where('iduser', Auth::id())->get();

        return Inertia::render('Category', [
            'category' => $category,
            'categories' => $categories
        ]);
    }

    /**
     * Metodo utilizado para atualizar as informaçoes.
     *
     * @param  \Illuminate\Http\Request  
     * @param  int 
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'nmcategory' => 'required|unique:categories',
            'tax' => 'required',
            'color' => 'required'
        ]);

        $category->update($request->all());

        return redirect()->route('categories.index')->with('success', 'Categoria atualizada com sucesso!');;
    }


    /**
     * Metodo utilizado para deletar UMA categoria.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return redirect()->route('categories.index')->with('error', 'Categoria não encontrada.');
        }

        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Categoria excluída com sucesso.');
    }
}
