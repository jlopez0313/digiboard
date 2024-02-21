<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ClientesController;
use App\Http\Controllers\ProveedoresController;
use App\Http\Controllers\RecaudosController;
use App\Http\Controllers\TiposClientesController;
use App\Http\Controllers\BancosController;
use App\Http\Controllers\ConceptosController;
use App\Http\Controllers\MedidasController;
use App\Http\Controllers\ColoresController;
use App\Http\Controllers\FacturasController;
use App\Http\Controllers\GastosController;
use App\Http\Controllers\InventarioController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

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

Route::prefix('parametros')->group( function() {
    
    Route::get('/', function () {
        return Inertia::render('Parametros/Index');
    })->name('parametros');

    Route::prefix('tipos_clientes')->group( function() {
        Route::get('/', [TiposClientesController::class, 'index'])->name('parametros.tipos');
    });

    Route::prefix('conceptos')->group( function() {
        Route::get('/', [ConceptosController::class, 'index'])->name('parametros.conceptos');
    });

    Route::prefix('bancos')->group( function() {
        Route::get('/', [BancosController::class, 'index'])->name('parametros.bancos');
    });

    Route::prefix('medidas')->group( function() {
        Route::get('/', [MedidasController::class, 'index'])->name('parametros.medidas');
    });

    Route::prefix('colores')->group( function() {
        Route::get('/', [ColoresController::class, 'index'])->name('parametros.colores');
    });


})->middleware(['auth', 'verified']);


Route::prefix('clientes')->group( function() {
    Route::get('/', [ClientesController::class, 'index'])->name('clientes');   
})->middleware(['auth', 'verified']);


Route::prefix('proveedores')->group( function() {
    Route::get('/', [ProveedoresController::class, 'index'])->name('proveedores');    
})->middleware(['auth', 'verified']);


Route::prefix('remisiones')->group( function() {
    Route::get('/', [FacturasController::class, 'index'])->name('remisiones');
    Route::get('/edit/{id}', [FacturasController::class, 'edit'])->name('remisiones.edit');
    
})->middleware(['auth', 'verified']);


Route::prefix('inventario')->group( function() {
    Route::get('/', [InventarioController::class, 'index'])->name('inventario');
    Route::get('edit/{id}', [InventarioController::class, 'edit'])->name('inventario.edit');
})->middleware(['auth', 'verified'])->name('inventario');


Route::prefix('/gastos')->group( function() {
    Route::get('/', [GastosController::class, 'index'])->name('gastos');
})->middleware(['auth', 'verified']);

Route::get('/creditos', function () {
    return Inertia::render('Creditos');
})->middleware(['auth', 'verified'])->name('creditos');

Route::prefix('/recaudos')->group( function() {
    Route::get('/', [RecaudosController::class, 'index'])->name('recaudos');
    Route::get('/edit/{id}', [RecaudosController::class, 'edit'])->name('recaudos.edit');
})->middleware(['auth', 'verified']);

Route::get('/reportes', function () {
    return Inertia::render('Reportes');
})->middleware(['auth', 'verified'])->name('reportes');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
