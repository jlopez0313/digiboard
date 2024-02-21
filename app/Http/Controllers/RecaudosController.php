<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\FacturasCollection;
use App\Http\Resources\RecaudosCollection;
use App\Models\Facturas;
use App\Models\Recaudos;
use Inertia\Inertia;

class RecaudosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Recaudos/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new FacturasCollection(
                Facturas::with(
                    'cliente', 'detalles'
                )
                ->withSum('detalles as valor', 'precio_venta')
                ->withSum('recaudos as cobros', 'valor')
                ->where('tipo_pago', 'CR')
                ->paginate()
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
        return Inertia::render('Recaudos/Edit', [
            'factura' => Facturas::with('detalles.producto.inventario', 'detalles.producto.color', 'detalles.producto.medida', 'recaudos', 'cliente')
                ->find( $id )
        ]);
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
