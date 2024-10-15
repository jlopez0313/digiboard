<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\CartelerasCollection;
use App\Http\Resources\PantallasCollection;
use App\Http\Resources\PantallasCartelerasCollection;
use App\Http\Resources\AreasCollection;
use App\Models\Areas;
use App\Models\Carteleras;
use App\Models\Pantallas;
use App\Models\PantallasCarteleras;
use Inertia\Inertia;

class CartelerasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Carteleras/Index', [
            'tenant' => 'tenant_' . tenant()->id,
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new CartelerasCollection(
                Carteleras::with('diseno')
                ->paginate()
            )
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Carteleras/Show', [
            'pantalla' => Carteleras::find( $id )
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function config(string $id)
    {
        return Inertia::render('Carteleras/Config', [
            'id' => $id,
            'contacts' => new PantallasCartelerasCollection(
                PantallasCarteleras::with('cartelera', 'pantalla.area')
                ->where('carteleras_id', $id)
                ->paginate()
            ),
            'areas' => new AreasCollection(
                Areas::orderBy('area')
                ->get()
            )
        ]);
    }
}
