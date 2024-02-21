<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\ClientesRequest;
use App\Http\Resources\ClientesResource;
use App\Models\Clientes;
use Inertia\Inertia;


class ClientesController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->except(['depto', 'tipo', 'ciudad']);
        $data['updated_by'] = \Auth::user()->id;
        $data['tipo_id'] = $request->tipo;
        $data['ciudad_id'] = $request->ciudad;

        $cliente = Clientes::create( $data );
        return new ClientesResource( $cliente );
    }

    /**
     * Display the specified resource.
     */
    public function show(Clientes $cliente)
    {
        $cliente->load('ciudad.departamento');
        return new ClientesResource($cliente);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Clientes $cliente)
    {
        $data = $request->except(['depto', 'tipo', 'ciudad']);
        $data['updated_by'] = \Auth::user()->id;
        $data['tipo_id'] = $request->tipo;
        $data['ciudad_id'] = $request->ciudad;

        $cliente->update( $data );
        return new ClientesResource( $cliente );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Clientes $cliente)
    {
        $cliente->delete();
        return new ClientesResource( $cliente );
    }

    public function byDocument( $cedula ) {
        $cliente = Clientes::with('tipo', 'ciudad.departamento')
        ->where('documento', $cedula)
        ->first();

        return new ClientesResource(
            $cliente
        );        
    }
}
