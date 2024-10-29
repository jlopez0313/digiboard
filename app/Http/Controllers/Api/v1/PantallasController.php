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
     * Get all resources.
     */
    public function index()
    {
        $data = Pantallas::all();
        return PantallasResource::collection( $data );
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all() ;
        $data['estado'] = 'I';

        $code = bin2hex(random_bytes(3));
        $data['code'] = $code;

        $pantalla = Pantallas::create( $data );
        return new PantallasResource( $pantalla );
    }

    /**
     * Display the specified resource.
     */
    public function show(Pantallas $pantalla)
    {
        $pantalla->load('area');
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

    public function byArea($area, $orientacion)
    {
        return PantallasResource::collection(
            Pantallas::where('areas_id', $area)
            ->where('orientaciones_id', $orientacion)
            ->orderBy('pantalla')
            ->get()
        );
    }

    public function codigo(Request $request, Pantallas $pantalla) {

        if( $pantalla->code == $request->password ) {
            return new PantallasResource( $pantalla );
        } else {
            return null;
        }
    }
}
