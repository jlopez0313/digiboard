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
        $pantalla = Pantallas::create( $request->all() );
        return new PantallasResource( $pantalla );
    }

    /**
     * Display the specified resource.
     */
    public function show(Pantallas $pantalla)
    {
        return new PantallasResource( $pantalla );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pantallas $pantalla)
    {
        $pantalla->update( $request->all() );
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
}
