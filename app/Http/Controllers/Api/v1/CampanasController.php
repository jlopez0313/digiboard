<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CampanasResource;
use App\Models\Campanas;
use Illuminate\Http\Request;

class CampanasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->except(
            'empresas_id',
            'areas_id',
            'disenos_id',
            'marquesina',
            'fecha_inicial',
            'fecha_final',
            'multimedias',
            'evaluador',
            'pantallas'
        );

        $data['usuarios_id'] = $request->evaluador;

        $campana = Campanas::create($data);
        $request->merge(['campanas_id' => $campana->id]);

        $cartelerasController = new CartelerasController();
        $cartelerasController->store($request);

        return new CampanasResource($campana);
    }

    /**
     * Display the specified resource.
     */
    public function show(Campanas $campana)
    {
        return new CampanasResource($campana);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Campanas $campana)
    {
        $campana->update($request->all());

        return new CampanasResource($campana);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campanas $campana)
    {
        $campana->delete();

        return new CampanasResource($campana);
    }
}
