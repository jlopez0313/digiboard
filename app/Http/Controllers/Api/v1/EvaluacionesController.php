<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\EvaluacionesRequest;
use App\Http\Resources\EvaluacionesResource;
use App\Models\Evaluaciones;
use Inertia\Inertia;


class EvaluacionesController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all() ;
        $evaluacion = Evaluaciones::create( $data );
        return new EvaluacionesResource( $evaluacion );
    }

    /**
     * Display the specified resource.
     */
    public function show(Evaluaciones $evaluacione)
    {
        $evaluacione->load('area');
        return new EvaluacionesResource( $evaluacione );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Evaluaciones $evaluacione)
    {
        $evaluacione->update( $request->all() );
        return new EvaluacionesResource( $evaluacione );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Evaluaciones $evaluacione)
    {
        $evaluacione->delete();
        return new EvaluacionesResource( $evaluacione );
    }

    public function byArea($area)
    {
        return EvaluacionesResource::collection(
            Evaluaciones::where('areas_id', $area)
            ->orderBy('evaluacione')
            ->get()
        );
    }

    public function codigo(Request $request, Evaluaciones $evaluacione) {

        if( $evaluacione->code == $request->password ) {
            return new EvaluacionesResource( $evaluacione );
        } else {
            return null;
        }
    }
}
