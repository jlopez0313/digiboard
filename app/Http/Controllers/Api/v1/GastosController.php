<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\GastosRequest;
use App\Http\Resources\GastosResource;
use App\Models\Gastos;
use Inertia\Inertia;


class GastosController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['updated_by'] = \Auth::user()->id;

        $gasto = Gastos::create( $data );
        return new GastosResource( $gasto );
    }

    /**
     * Display the specified resource.
     */
    public function show(Gastos $gasto)
    {
        return new GastosResource( $gasto );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gastos $gasto)
    {
        $gasto->updated_by = \Auth::user()->id;
        $gasto->update( $request->all() );
        return new GastosResource( $gasto );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gastos $gasto)
    {
        $gasto->delete();
        return new GastosResource( $gasto );
    }
}
