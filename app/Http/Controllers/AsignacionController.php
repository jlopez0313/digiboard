<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Pantallas;

class AsignacionController extends Controller
{
    public function show(string $id) {

        return Inertia::render('Asignacion/Index', [
            'pantalla' => Pantallas::with('cartelera.multimedias', 'cartelera.medias', 'cartelera.campana')
                ->find($id)
        ]);
        
    }
}
