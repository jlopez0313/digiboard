<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\v1\BancosController;
use App\Http\Controllers\Api\v1\ColoresController;
use App\Http\Controllers\Api\v1\ConceptosController;
use App\Http\Controllers\Api\v1\CiudadesController;
use App\Http\Controllers\Api\v1\ClientesController;
use App\Http\Controllers\Api\v1\DetallesController;
use App\Http\Controllers\Api\v1\FacturasController;
use App\Http\Controllers\Api\v1\GastosController;
use App\Http\Controllers\Api\v1\InventariosController;
use App\Http\Controllers\Api\v1\MedidasController;
use App\Http\Controllers\Api\v1\ProveedoresController;
use App\Http\Controllers\Api\v1\ProductosController;
use App\Http\Controllers\Api\v1\RecaudosController;
use App\Http\Controllers\Api\v1\TipoClientesController;

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

    Route::prefix('ciudades')->group( function() {
        Route::get('/{depto}', [CiudadesController::class, 'byDepto']);
    });
    
    Route::apiResource('bancos', BancosController::class);
    Route::apiResource('colores', ColoresController::class);
    Route::apiResource('conceptos', ConceptosController::class);
    
    Route::prefix('clientes')->group( function() {
        Route::post('by-document/{cedula}', [ClientesController::class, 'byDocument']);
    });
    Route::apiResource('clientes', ClientesController::class);

    Route::apiResource('facturas', FacturasController::class);
    Route::apiResource('gastos', GastosController::class);
    Route::apiResource('inventarios', InventariosController::class);
    Route::apiResource('medidas', MedidasController::class);
    Route::apiResource('proveedores', ProveedoresController::class);
    
    Route::prefix('productos')->group( function() {
        Route::get('referencia/{referencia}', [ProductosController::class, 'byReferencia']);
    });
    Route::apiResource('productos', ProductosController::class);
    
    Route::apiResource('tipo-clientes', TipoClientesController::class);
    Route::apiResource('detalles', DetallesController::class);
    Route::apiResource('recaudos', RecaudosController::class);

})->middleware(['auth:sanctum', 'verified']);
