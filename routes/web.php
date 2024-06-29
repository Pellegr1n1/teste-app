<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardCompanyController;
use App\Http\Controllers\PayloadController;
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

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboardCompany', [DashboardCompanyController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboardCompany.index');

/** ------------------------------------ **/

/** ----------------- Routes Cart ----------------- **/
Route::get('/cart', [CartController::class, 'index'])->middleware(['auth', 'verified'])->name('carts.index');

Route::post('/address', [AddressController::class, 'create'])->middleware(['auth', 'verified'])->name('address.create');

Route::post('/payload', [PayloadController::class, 'create'])->middleware(['auth', 'verified'])->name('payload.create');


Route::get('/historic', function () {
    return Inertia::render('Historic');
})->middleware(['auth', 'verified', 'client'])->name('historic');

Route::middleware('auth', 'verified', 'company')->group(function () {
    /** ----------------- Routes Product ----------------- **/
    Route::get('/product', [ProductController::class, 'index'])->name('products.index');
    Route::post('/product', [ProductController::class, 'store'])->name('products.store');
    Route::delete('/product/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
    /** ----------------- Routes Categories -------------- **/
    Route::get('/category', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/category/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::post('/category', [CategoryController::class, 'store'])->name('categories.store');
    Route::delete('/category/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::put('/category/{id}', [CategoryController::class, 'update'])->name('categories.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
