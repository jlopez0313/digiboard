<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\ConceptosRequest;
use App\Http\Resources\ConceptosResource;
use App\Models\Conceptos;
use Inertia\Inertia;


class ConceptosController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $concepto = Conceptos::create( $data );
        return new ConceptosResource( $concepto );
    }

    /**
     * Display the specified resource.
     */
    public function show(Conceptos $concepto)
    {
        return new ConceptosResource( $concepto );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conceptos $concepto)
    {
        $concepto->update( $request->all() );
        return new ConceptosResource( $concepto );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conceptos $concepto)
    {
        $concepto->delete();
        return new ConceptosResource( $concepto );
    }
}
