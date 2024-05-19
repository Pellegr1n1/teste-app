<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/cart', function () {
    return Inertia::render('Cart');
})->middleware(['auth', 'verified'])->name('cart');

Route::get('/historic', function () {
    return Inertia::render('Historic');
})->middleware(['auth', 'verified'])->name('historic');

Route::get('/product', function () {
    return Inertia::render('Product');
})->middleware(['auth', 'verified'])->name('product');

/**
 * Routes Category
 * */

Route::get('/category', [CategoryController::class, 'index'])->middleware(['auth', 'verified'])->name('categories.index');

Route::get('/category/{id}/edit', [CategoryController::class, 'edit'])->middleware(['auth', 'verified'])->name('categories.edit');

Route::post('/category', [CategoryController::class, 'store'])->middleware(['auth', 'verified'])->name('categories.store');

Route::delete('/category/{id}', [CategoryController::class, 'destroy'])->middleware(['auth', 'verified'])->name('categories.destroy');

Route::put('/category/{id}', [CategoryController::class, 'update'])->middleware(['auth', 'verified'])->name('categories.update');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
