<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\ClientesCollection;
use App\Http\Resources\ConceptosCollection;
use App\Http\Resources\GastosCollection;
use App\Models\Gastos;
use App\Models\Clientes;
use App\Models\Conceptos;
use Inertia\Inertia;

class GastosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Gastos/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new GastosCollection(
                Gastos::with(
                    'concepto',
                    'cliente'
                )->paginate()
            ),
            'clientes' => new ClientesCollection(
                Clientes::orderBy('nombre')->get()
            ),
            'conceptos' => new ConceptosCollection(
                Conceptos::orderBy('concepto')->get()
            ),
            'origenes' => config('constants.origenes')
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
