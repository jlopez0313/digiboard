<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Inertia\Inertia;

use App\Http\Controllers\AreasController;
use App\Http\Controllers\AsignacionController;
use App\Http\Controllers\CampanasController;
use App\Http\Controllers\CartelerasController;
use App\Http\Controllers\CiudadesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartamentosController;
use App\Http\Controllers\EmpresasController;
use App\Http\Controllers\PantallasController;
use App\Http\Controllers\UsuariosController;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    Route::get('/', function () {
        return 'This is your multi-tenant application. The id of the current tenant is ' . tenant('id');
    });

    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => false,
            'laravelVersion' => '1.0.0',
        ]);
    });

    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    })->name('dashboard');

    Route::prefix('parametros')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Parametros/Index');
        })->name('parametros');

        Route::prefix('departamentos')->group(function () {
            Route::get('/', [DepartamentosController::class, 'index'])->name('parametros.departamentos');
        });

        Route::prefix('ciudades')->group(function () {
            Route::get('/', [CiudadesController::class, 'index'])->name('parametros.ciudades');
        });
    });

    Route::prefix('empresas')->group(function () {
        Route::get('/', [EmpresasController::class, 'index'])->name('empresas');
    });

    Route::prefix('areas')->group(function () {
        Route::get('/', [AreasController::class, 'index'])->name('areas');
    });

    Route::prefix('pantallas')->group(function () {
        Route::get('/', [PantallasController::class, 'index'])->name('pantallas');
    });

    Route::prefix('asignacion')->group(function () {
        Route::get('/{id}', [AsignacionController::class, 'show'])->name('asignacion.show');
    });

    Route::prefix('carteleras')->group(function () {
        Route::get('/', [CartelerasController::class, 'index'])->name('carteleras');
        Route::get('/config/{id}', [CartelerasController::class, 'config'])->name('carteleras.config');
        Route::get('/{id}', [CartelerasController::class, 'show'])->name('carteleras.show');
    });

    Route::prefix('campanas')->group(function () {
        Route::get('/', [CampanasController::class, 'index'])->name('campanas');
        Route::get('/config/{id}', [CampanasController::class, 'config'])->name('campanas.config');
        Route::get('/create', [CampanasController::class, 'create'])->name('campanas.create');
        Route::get('/{id}', [CampanasController::class, 'show'])->name('campanas.show');
    });

    Route::prefix('usuarios')->group(function () {
        Route::get('/', [UsuariosController::class, 'index'])->name('usuarios');
        Route::get('/config/{id}', [UsuariosController::class, 'config'])->name('usuarios.config');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// require __DIR__.'/tenant_auth.php';

