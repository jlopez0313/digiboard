<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\DetallesRequest;
use App\Http\Resources\DetallesResource;
use App\Models\Detalles;
use App\Models\Facturas;
use Inertia\Inertia;


class DetallesController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->except(['referencia']);
        $detalle = Detalles::create( $data );
        return new DetallesResource( $detalle );
    }

    /**
     * Display the specified resource.
     */
    public function show(Detalles $detalle)
    {
        return new DetallesResource( $detalle );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Detalles $detalle)
    {
        $data = $request->except(['referencia']);
        $detalle->update( $data );
        return new DetallesResource( $detalle );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Detalles $detalle)
    {
        $detalle->delete();
        return new DetallesResource( $detalle );
    }
}
