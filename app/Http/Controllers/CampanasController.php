<?php

namespace App\Http\Controllers;

use App\Http\Resources\CampanasResource;
use App\Http\Resources\CampanasCollection;
use App\Http\Resources\UsuariosCollection;
use App\Http\Resources\AreasCollection;
use App\Http\Resources\DepartamentosCollection;
use App\Models\Departamentos;
use App\Models\Areas;
use App\Models\Campanas;
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
        return Inertia::render('Campañas/Calendario/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new CampanasCollection(
                Campanas::with('evaluador', 'cartelera.pantallas')
                ->get()
            ),
            'usuarios' => new UsuariosCollection(
                User::orderBy('name')
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
            'departamentos' => new DepartamentosCollection(
                Departamentos::orderBy('departamento')
                ->get()
            ),
            'tipos_respuesta' => config('constants.tipo_respuesta'),
            'orientaciones' => config('constants.orientaciones')
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
        return Inertia::render('Campañas/Form', [
            'usuarios' => new UsuariosCollection(
                User::orderBy('name')
                ->get()
            ),
            'departamentos' => new DepartamentosCollection(
                Departamentos::orderBy('departamento')
                ->get()
            ),
            'tipos_respuesta' => config('constants.tipo_respuesta'),
            'id' => $id,
        ]);
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

    public function lista()
    {
        return Inertia::render('Campañas/Lista/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new CampanasCollection(
                Campanas::with('evaluador', 'cartelera.pantallas')
                ->paginate()
            ),
        ]);
    }

    public function encuesta(string $id) {
        return Inertia::render('Campañas/Encuesta', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new CampanasResource(
                Campanas::with('evaluador', 'cartelera.pantallas', 'evaluaciones')
                ->find( $id )
            ),
        ]);
    }

    public function test(string $id) {
        return Inertia::render('Campañas/Test', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new CampanasResource(
                Campanas::with('evaluador', 'cartelera.pantallas', 'evaluaciones')
                ->find( $id )
            ),
        ]);
    }
}
