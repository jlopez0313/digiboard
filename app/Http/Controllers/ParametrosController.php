<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\ParametrosCollection;
use App\Models\Parametros;

use Inertia\Inertia;

class ParametrosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function colores()
    {
        return Inertia::render('Parametros/Colores/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => Parametros::first()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function logo()
    {
        return Inertia::render('Parametros/Logo/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => Parametros::first(),
            'tenant' => 'tenant_' . tenant()->id

        ]);
    }

}
