<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\PantallasRequest;
use App\Http\Resources\PantallasResource;
use App\Models\Pantallas;
use Inertia\Inertia;


class PantallasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->except('empresas_id') ;
        $pantalla = Pantallas::create( $data );
        return new PantallasResource( $pantalla );
    }

    /**
     * Display the specified resource.
     */
    public function show(Pantallas $pantalla)
    {
        $pantalla->load('area.empresa');
        return new PantallasResource( $pantalla );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pantallas $pantalla)
    {
        $data = $request->except('empresas_id') ;
        $pantalla->update( $data );
        return new PantallasResource( $pantalla );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pantallas $pantalla)
    {
        $pantalla->delete();
        return new PantallasResource( $pantalla );
    }

    public function byArea($area)
    {
        return PantallasResource::collection(
            Pantallas::where('areas_id', $area)
            ->orderBy('pantalla')
            ->get()
        );
    }
}
