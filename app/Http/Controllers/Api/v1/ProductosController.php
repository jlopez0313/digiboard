<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\ProductosRequest;
use App\Http\Resources\ProductosResource;
use App\Models\Productos;
use Inertia\Inertia;


class ProductosController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['updated_by'] = \Auth::user()->id;

        $producto = Productos::create( $data );
        return new ProductosResource( $producto );
    }

    /**
     * Display the specified resource.
     */
    public function show(Productos $producto)
    {
        return new ProductosResource( $producto );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Productos $producto)
    {
        $producto->updated_by = \Auth::user()->id;
        $producto->update( $request->all() );
        return new ProductosResource( $producto );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Productos $producto)
    {
        $producto->delete();
        return new ProductosResource( $producto );
    }

    public function byReferencia( $referencia ) {
        $producto = Productos::with('inventario')
        ->where('referencia', $referencia)
        ->first();

        return new ProductosResource(
            $producto
        );      
    }
}
