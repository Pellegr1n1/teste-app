<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/** ------------------Routes Dashboard------------------ **/

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/** ------------------------------------ **/

/** ----------------- Routes Cart ----------------- **/
Route::get('/cart', [CartController::class, 'index'])->middleware(['auth', 'verified'])->name('carts.index');


Route::post('/address', [AddressController::class, 'create'])->middleware(['auth', 'verified'])->name('address.create');



Route::get('/historic', function () {
    return Inertia::render('Historic');
})->middleware(['auth', 'verified', 'client'])->name('historic');

/** ----------------- Routes Product ----------------- **/

Route::get('/product', [ProductController::class, 'index'])->middleware(['auth', 'verified', 'company'])->name('products.index');
Route::post('/product', [ProductController::class, 'store'])->middleware(['auth', 'verified', 'company'])->name('products.store');
Route::delete('/product/{id}', [ProductController::class, 'destroy'])->middleware(['auth', 'verified', 'company'])->name('products.destroy');

/** -------------------------------------------------- **/


/**
 * Routes Category
 * */

Route::get('/category', [CategoryController::class, 'index'])->middleware(['auth', 'verified', 'company'])->name('categories.index');
Route::get('/category/{id}/edit', [CategoryController::class, 'edit'])->middleware(['auth', 'verified', 'company'])->name('categories.edit');
Route::post('/category', [CategoryController::class, 'store'])->middleware(['auth', 'verified', 'company'])->name('categories.store');
Route::delete('/category/{id}', [CategoryController::class, 'destroy'])->middleware(['auth', 'verified', 'company'])->name('categories.destroy');
Route::put('/category/{id}', [CategoryController::class, 'update'])->middleware(['auth', 'verified', 'company'])->name('categories.update');

/** ------------------------------------ **/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
