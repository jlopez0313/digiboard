<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\MedidasRequest;
use App\Http\Resources\MedidasResource;
use App\Models\Medidas;
use Inertia\Inertia;


class MedidasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $medida = Medidas::create( $data );
        return new MedidasResource( $medida );
    }

    /**
     * Display the specified resource.
     */
    public function show(Medidas $medida)
    {
        return new MedidasResource( $medida );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Medidas $medida)
    {
        $medida->update( $request->all() );
        return new MedidasResource( $medida );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medidas $medida)
    {
        $medida->delete();
        return new MedidasResource( $medida );
    }
}
