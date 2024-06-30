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
use App\Http\Controllers\HistoricController;
use App\Http\Controllers\OrderController;
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

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboardCompany', [DashboardCompanyController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboardCompany.index');

/** ----------------- Routes Client ----------------- **/
Route::middleware('auth', 'verified', 'client')->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->name('carts.index');
    Route::post('/address', [AddressController::class, 'create'])->name('address.create');
    Route::delete('/address/{id}', [AddressController::class, 'destroy'])->name('address.destroy');
    Route::post('/payload', [PayloadController::class, 'create'])->name('payload.create');
    Route::post('/order', [OrderController::class, 'create'])->name('orders.create');
    Route::get('/historic', [HistoricController::class, 'index'])->name('historic.index');
});

/** ----------------- Routes Company ----------------- **/
Route::middleware('auth', 'verified', 'company')->group(function () {
    Route::get('/product', [ProductController::class, 'index'])->name('products.index');
    Route::post('/product', [ProductController::class, 'store'])->name('products.store');
    Route::delete('/product/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
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
