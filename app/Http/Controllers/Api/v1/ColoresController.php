<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\ColoresRequest;
use App\Http\Resources\ColoresResource;
use App\Models\Colores;
use Inertia\Inertia;


class ColoresController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $colore = Colores::create( $data );
        return new ColoresResource( $colore );
    }

    /**
     * Display the specified resource.
     */
    public function show(Colores $colore)
    {
        return new ColoresResource( $colore );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Colores $colore)
    {
        $colore->update( $request->all() );
        return new ColoresResource( $colore );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Colores $colore)
    {
        $colore->delete();
        return new ColoresResource( $colore );
    }
}
