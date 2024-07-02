<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AvaliableController;
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

Route::middleware('auth', 'verified')->group(function () {
    Route::post('/address', [AddressController::class, 'create'])->name('address.create');
    Route::put('/address/{id}', [AddressController::class, 'update'])->name('address.update');
    Route::delete('/address/{id}', [AddressController::class, 'destroy'])->name('address.destroy');
});

/** ----------------- Routes Client ----------------- **/
Route::middleware('auth', 'verified', 'client')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/cart', [CartController::class, 'index'])->name('carts.index');
    Route::post('/payload', [PayloadController::class, 'create'])->name('payload.create');
    Route::post('/order', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/avaliable', [AvaliableController::class, 'create'])->name('avaliable.create');
    Route::get('/historic', [HistoricController::class, 'index'])->name('historic.index');
});

/** ----------------- Routes Company ----------------- **/
Route::middleware('auth', 'verified', 'company')->group(function () {
    Route::get('/dashboard-company', [DashboardCompanyController::class, 'index'])->name('dashboardCompany.index');
    Route::get('/address', [AddressController::class, 'edit'])->name('address.edit');
    /** ----------------- Routes Product ----------------- **/
    Route::get('/product', [ProductController::class, 'index'])->name('products.index');
    Route::get('/product/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::post('/product', [ProductController::class, 'store'])->name('products.store');
    Route::put('/product/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/product/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
    /** ----------------- Routes Category ----------------- **/
    Route::get('/category', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/category/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::post('/category', [CategoryController::class, 'store'])->name('categories.store');
    Route::delete('/category/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::put('/category/{id}/edit', [CategoryController::class, 'update'])->name('categories.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
