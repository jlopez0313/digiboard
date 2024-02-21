<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\InventariosRequest;
use App\Http\Resources\InventariosResource;
use App\Models\Inventarios;
use Inertia\Inertia;


class InventariosController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['updated_by'] = \Auth::user()->id;

        $inventario = Inventarios::create( $data );
        return new InventariosResource( $inventario );
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventarios $inventario)
    {
        return new InventariosResource( $inventario );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inventarios $inventario)
    {
        $inventario->updated_by = \Auth::user()->id;
        $inventario->update( $request->all() );
        return new InventariosResource( $inventario );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventarios $inventario)
    {
        $inventario->delete();
        return new InventariosResource( $inventario );
    }
}
