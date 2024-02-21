<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\facturasRequest;
use App\Http\Resources\facturasResource;
use App\Models\Facturas;
use Inertia\Inertia;


class FacturasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data['clientes_id'] = $request->clientes_id;
        $data['tipo_pago'] = $request->tipo_pago;
        $data['updated_by'] = \Auth::user()->id;

        $factura = Facturas::create( $data );
        return new FacturasResource( $factura );
    }

    /**
     * Display the specified resource.
     */
    public function show(Facturas $factura)
    {
        return new FacturasResource( $factura );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Facturas $factura)
    {
        $factura->updated_by = \Auth::user()->id;
        $factura->update( $request->all() );
        return new FacturasResource( $factura );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Facturas $factura)
    {
        $factura->delete();
        return new FacturasResource( $factura );
    }
}
