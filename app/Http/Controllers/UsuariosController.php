<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\DepartamentosCollection;
use App\Http\Resources\UsuariosCollection;
use App\Http\Resources\UsuariosAreasCollection;
use App\Models\Departamentos;
use App\Models\User;
use App\Models\UsuariosAreas;

use Inertia\Inertia;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Usuarios/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new UsuariosCollection(
                User::paginate()
            ),
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
        //
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
        $user = User::find( $id );

        return Inertia::render('Usuarios/Areas/Index', [
            'id' => $id,
            'contacts' => new UsuariosAreasCollection(
                UsuariosAreas::with('usuario', 'area.ciudad.departamento')
                ->where('usuarios_id', $id)
                ->paginate()
            ),
            'departamentos' => new DepartamentosCollection(
                Departamentos::orderBy('departamento')
                ->get()
            )
        ]);
    }
}
