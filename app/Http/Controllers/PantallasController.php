<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\PantallasCollection;
use App\Http\Resources\DepartamentosCollection;
use App\Models\Departamentos;
use App\Models\Pantallas;
use Inertia\Inertia;

class PantallasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Pantallas/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new PantallasCollection(
                Pantallas::with(
                    'area.ciudad.departamento',
                    'cartelera'
                )->paginate()
            ),
            'departamentos' => new DepartamentosCollection(
                Departamentos::orderBy('departamento')
                ->get()
            ),
            'orientaciones' => config('constants.orientaciones')
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
