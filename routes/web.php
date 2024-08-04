<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DepartamentosController;
use App\Http\Controllers\CiudadesController;
use App\Http\Controllers\EmpresasController;

use App\Http\Controllers\AreasController;
use App\Http\Controllers\PantallasController;
use App\Http\Controllers\CartelerasController;
use App\Http\Controllers\CampañasController;
use App\Http\Controllers\AsignacionController;

use App\Http\Controllers\MedidasController;
use App\Http\Controllers\ColoresController;
use App\Http\Controllers\FacturasController;
use App\Http\Controllers\GastosController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\UsuariosController;

use App\Http\Controllers\DashboardController;


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

Route::middleware(['auth', 'verified'])
->group(function () {

    
    Route::prefix('dashboard')->group( function() {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    })->name('dashboard');
    
    Route::prefix('parametros')->group( function() {
        
        Route::get('/', function () {
            return Inertia::render('Parametros/Index');
        })->name('parametros');
    
        Route::prefix('departamentos')->group( function() {
            Route::get('/', [DepartamentosController::class, 'index'])->name('parametros.departamentos');
        });
    
        Route::prefix('ciudades')->group( function() {
            Route::get('/', [CiudadesController::class, 'index'])->name('parametros.ciudades');
        });
    
    });
    
    
    Route::prefix('empresas')->group( function() {
        Route::get('/', [EmpresasController::class, 'index'])->name('empresas');
    });
    
    
    Route::prefix('areas')->group( function() {
        Route::get('/', [AreasController::class, 'index'])->name('areas');    
    });
    
    
    Route::prefix('pantallas')->group( function() {
        Route::get('/', [PantallasController::class, 'index'])->name('pantallas');
    });
    
    Route::prefix('asignacion')->group( function() {
        Route::get('/{id}', [AsignacionController::class, 'show'])->name('asignacion.show');
    });
    
    Route::prefix('carteleras')->group( function() {
        Route::get('/', [CartelerasController::class, 'index'])->name('carteleras');
        Route::get('/config/{id}', [CartelerasController::class, 'config'])->name('carteleras.config');
        Route::get('/{id}', [CartelerasController::class, 'show'])->name('carteleras.show');
    });
    
    Route::prefix('campañas')->group( function() {
        Route::get('/', [CampañasController::class, 'index'])->name('campañas');
        Route::get('/config/{id}', [CampañasController::class, 'config'])->name('campañas.config');
        Route::get('/{id}', [CampañasController::class, 'show'])->name('campañas.show');
    });
    
    Route::prefix('usuarios')->group( function() {
        Route::get('/', [UsuariosController::class, 'index'])->name('usuarios');
        Route::get('/config/{id}', [UsuariosController::class, 'config'])->name('usuarios.config');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';
