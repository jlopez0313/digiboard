<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\CartelerasCollection;
use App\Http\Resources\EmpresasCollection;
use App\Models\Carteleras;
use App\Models\Empresas;
use Inertia\Inertia;

class CartelerasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Carteleras/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new CartelerasCollection(
                Carteleras::with('pantalla.area.empresa', 'diseno')
                ->paginate()
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
