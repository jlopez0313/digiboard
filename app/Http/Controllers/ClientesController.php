<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\ClientesCollection;
use App\Http\Resources\ClientesResource;
use App\Http\Resources\TiposClientesCollection;
use App\Http\Resources\DepartamentosCollection;
use App\Models\Clientes;
use App\Models\TiposClientes;
use App\Models\Departamentos;
use Inertia\Inertia;


class ClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Clientes/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'departamentos' => new DepartamentosCollection(
                Departamentos::orderBy('departamento')->get()
            ),
            'tipoClientes' => new TiposClientesCollection(
                TiposClientes::orderBy('tipo')->get()
            ),
            'contacts' => new ClientesCollection(
                Clientes::with(
                    'tipo', 
                    'ciudad',
                    'ciudad.departamento'
                )->paginate()
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
}
