<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\v1\DepartamentosController;
use App\Http\Controllers\Api\v1\CiudadesController;
use App\Http\Controllers\Api\v1\EmpresasController;

use App\Http\Controllers\Api\v1\AreasController;
use App\Http\Controllers\Api\v1\PantallasController;
use App\Http\Controllers\Api\v1\CartelerasController;

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

Route::group(['prefix' => 'v1'], function () {

    Route::apiResource('departamentos', DepartamentosController::class);

    Route::prefix('ciudades')->group( function() {
        Route::get('by-departamento/{departamento}', [CiudadesController::class, 'byDepartamento']);
    });
    Route::apiResource('ciudades', CiudadesController::class);

    Route::apiResource('empresas', EmpresasController::class);

/*
    Route::prefix('ciudades')->group( function() {
        Route::get('/{depto}', [CiudadesController::class, 'byDepto']);
    });
*/  
    Route::apiResource('areas', AreasController::class);
    Route::apiResource('pantallas', PantallasController::class);
    Route::apiResource('carteleras', CartelerasController::class);

})->middleware(['auth:sanctum', 'verified']);
