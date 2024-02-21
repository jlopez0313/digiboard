<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\TiposClientesRequest;
use App\Http\Resources\TiposClientesResource;
use App\Models\TiposClientes;
use Inertia\Inertia;


class TipoClientesController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $tipo = TiposClientes::create( $data );
        return new TiposClientesResource( $tipo );
    }

    /**
     * Display the specified resource.
     */
    public function show(TiposClientes $tipo_cliente)
    {
        return new TiposClientesResource( $tipo_cliente );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TiposClientes $tipo_cliente)
    {
        $tipo_cliente->update( $request->all() );
        return new TiposClientesResource( $tipo_cliente );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TiposClientes $tipo_cliente)
    {
        $tipo->delete();
        return new TiposClientesResource( $tipo );
    }
}
