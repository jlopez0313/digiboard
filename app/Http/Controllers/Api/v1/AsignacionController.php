<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;


use App\Http\Resources\PantallasCartelerasResource;

use App\Models\PantallasCarteleras;
use App\Models\Pantallas;


class AsignacionController extends Controller
{
    public function activar(Request $request, Pantallas $pantalla)
    {
        $pantalla->update( ['estado' => $request->estado] );

        $asignacion = PantallasCarteleras::where('pantallas_id', $pantalla->id)
            ->where('carteleras_id', $pantalla->carteleras_id)
            ->first();

        $asignacion->estado = 'A';
        $asignacion->update();

        return new PantallasCartelerasResource( $asignacion );
    }
    

    public function show(string $id) {

        return Pantallas::with('cartelera.multimedias')
                ->find($id);
        
    }

}
