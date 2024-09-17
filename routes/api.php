<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

use App\Http\Controllers\Api\v1\TenantsController;

use App\Http\Controllers\Api\v1\DepartamentosController;
use App\Http\Controllers\Api\v1\CiudadesController;
use App\Http\Controllers\Api\v1\EmpresasController;
use App\Http\Controllers\Api\v1\EvaluacionesController;
use App\Http\Controllers\Api\v1\AsignacionController;

use App\Http\Controllers\Api\v1\AreasController;
use App\Http\Controllers\Api\v1\PantallasController;
use App\Http\Controllers\Api\v1\CampanasController;
use App\Http\Controllers\Api\v1\CartelerasController;
use App\Http\Controllers\Api\v1\MultimediasController;
use App\Http\Controllers\Api\v1\UsuariosController;
use App\Http\Controllers\Api\v1\UserController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware([
    'api',
    'universal',
    InitializeTenancyByDomain::class,
])
->prefix('v1')->group(function () {
    Route::prefix('usuarios')->group(function () {
        Route::post('/get-admin', [UserController::class, 'getAdmin']);
    });
});


Route::middleware([
    'api',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])
->prefix('v1')->group(function () {
    Route::apiResource('departamentos', DepartamentosController::class);

    Route::prefix('ciudades')->group( function() {
        Route::get('by-departamento/{departamento}', [CiudadesController::class, 'byDepartamento']);
    });
    Route::apiResource('ciudades', CiudadesController::class);

    Route::apiResource('empresas', EmpresasController::class);


    
    Route::apiResource('evaluaciones', EvaluacionesController::class);
    Route::apiResource('multimedias', MultimediasController::class);
    
    Route::apiResource('areas', AreasController::class);
    
    Route::prefix('pantallas')->group( function() {
        Route::get('/area/{area}', [PantallasController::class, 'byArea']);
    });
    Route::apiResource('pantallas', PantallasController::class);
    
    Route::prefix('campanas')->group( function() {
        Route::put('/evaluar/{id}', [CampanasController::class, 'evaluar']);
    });
    Route::apiResource('campanas', CampanasController::class);
    
    Route::prefix('carteleras')->group( function() {
        Route::put('/asignar', [CartelerasController::class, 'asignar']);
        Route::delete('/desasignar/{pantalla_cartelera}', [CartelerasController::class, 'desasignar']);
    });
    Route::apiResource('carteleras', CartelerasController::class);
    
    
    Route::prefix('asignacion')->group( function() {
        Route::post('/{id}', [AsignacionController::class, 'show']);
        Route::post('/codigo/{pantalla}', [PantallasController::class, 'codigo']);
        Route::post('/activar/{pantalla}', [AsignacionController::class, 'activar'])->name('asignacion.activar');
    })->middleware(['auth', 'verified']);


    Route::prefix('usuarios')->group( function() {
        Route::put('/asignar', [UsuariosController::class, 'asignar']);
        Route::delete('/desasignar/{usuario_area}', [UsuariosController::class, 'desasignar']);
    });
    Route::apiResource('usuarios', UsuariosController::class);

})->middleware(['auth:sanctum', 'verified']);


Route::group(['prefix' => 'v1'], function () {
    Route::apiResource('tenants', TenantsController::class);
})->middleware(['auth:sanctum', 'verified']);
