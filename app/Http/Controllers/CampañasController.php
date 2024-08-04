<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\CartelerasCollection;
use App\Http\Resources\UsuariosCollection;
use App\Http\Resources\EmpresasCollection;
use App\Http\Resources\PantallasCollection;
use App\Http\Resources\PantallasCartelerasCollection;
use App\Models\User;
use App\Models\Carteleras;
use App\Models\Empresas;
use App\Models\Pantallas;
use App\Models\PantallasCarteleras;
use Inertia\Inertia;

class CampañasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Campañas/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new CartelerasCollection(
                Carteleras::with('diseno')
                ->get()
            ),
            'usuarios' => new UsuariosCollection(
                User::orderBy('name')
                ->get()
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
        return Inertia::render('Campañas/Show', [
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
                PantallasCarteleras::with('cartelera', 'pantalla.area.empresa')
                ->where('carteleras_id', $id)
                ->paginate()
            ),
            'empresas' => new EmpresasCollection(
                Empresas::orderBy('empresa')
                ->get()
            )
        ]);
    }
}
