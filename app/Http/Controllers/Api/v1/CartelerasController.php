<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\CartelerasRequest;
use App\Http\Resources\CartelerasResource;
use App\Models\Carteleras;
use Inertia\Inertia;


class CartelerasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->except('empresas_id', 'areas_id');
        $cartelera = Carteleras::create( $data );
        return new CartelerasResource( $cartelera );
    }

    /**
     * Display the specified resource.
     */
    public function show(Carteleras $cartelera)
    {
        $cartelera->load('pantalla.area.empresa');
        return new CartelerasResource( $cartelera );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Carteleras $cartelera)
    {
        $data = $request->except('empresas_id', 'areas_id');
        $cartelera->update( $data );
        return new CartelerasResource( $cartelera );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carteleras $cartelera)
    {
        $cartelera->delete();
        return new CartelerasResource( $cartelera );
    }
}
