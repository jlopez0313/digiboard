<?php

namespace App\Http\Controllers;

use App\Http\Resources\CampanasCollection;
use App\Http\Resources\EmpresasCollection;
use App\Http\Resources\UsuariosCollection;
use App\Models\Campanas;
use App\Models\Empresas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use Inertia\Inertia;

class CampanasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Campañas/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new CampanasCollection(
                Campanas::with('evaluador', 'carteleras')
                ->get()
            ),
            'usuarios' => new UsuariosCollection(
                User::orderBy('name')
                ->get()
            ),
            'empresas' => new EmpresasCollection(
                Empresas::orderBy('empresa')
                ->get()
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Campañas/Form', [
            'usuarios' => new UsuariosCollection(
                User::orderBy('name')
                ->get()
            ),
            'empresas' => new EmpresasCollection(
                Empresas::orderBy('empresa')
                ->get()
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Campañas/Show', [
            'pantalla' => Campanas::find($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
    }
}
