<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\ProveedoresRequest;
use App\Http\Resources\ProveedoresResource;
use App\Models\Proveedores;
use Inertia\Inertia;


class ProveedoresController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->except(['depto', 'tipo', 'ciudad']);
        $data['updated_by'] = \Auth::user()->id;
        $data['ciudad_id'] = $request->ciudad;

        $proveedor = Proveedores::create( $data );
        return new ProveedoresResource( $proveedor );
    }

    /**
     * Display the specified resource.
     */
    public function show(Proveedores $proveedore)
    {
        $proveedore->load('ciudad.departamento');
        return new ProveedoresResource($proveedore);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proveedores $proveedore)
    {
        $data = $request->except(['depto', 'tipo', 'ciudad']);
        $data['updated_by'] = \Auth::user()->id;
        $data['ciudad_id'] = $request->ciudad;

        $proveedore->update( $data );
        return new ProveedoresResource( $proveedore );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proveedores $proveedore)
    {
        $proveedore->delete();
        return new ColoresResource( $proveedore );
    }
}
