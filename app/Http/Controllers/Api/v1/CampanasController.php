<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CampanasResource;
use App\Models\Campanas;
use App\Models\Carteleras;
use Illuminate\Http\Request;

class CampanasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->except(
            'areas_id',
            'disenos_id',
            'marquesina',
            'fecha_inicial',
            'fecha_final',
            'multimedias',
            'evaluador',
            'pantallas',
            'orientaciones_id',
            'deptos_id',
            'ciudades_id',
            'pantallas_id'
        );

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
        $campana->load('cartelera.pantallas.pantalla.area.ciudad.departamento', 'cartelera.multimedias');
        return new CampanasResource($campana);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Campanas $campana)
    {
        $data = $request->except(
            'areas_id',
            'disenos_id',
            'marquesina',
            'fecha_inicial',
            'fecha_final',
            'multimedias',
            'evaluador',
            'pantallas',
            'orientaciones_id',
            'deptos_id',
            'ciudades_id',
            'pantallas_id'
        );

        $campana->update($data);
        $request->merge(['campanas_id' => $campana->id]);

        $cartelera = Carteleras::find( $campana->cartelera->id );

        $cartelerasController = new CartelerasController();
        $cartelerasController->update($request, $cartelera);
        
        

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


    public function evaluar(Request $request, string $id)
    {
        $campana = Campanas::find( $id );
        $campana->update($request->all());

        return new CampanasResource($campana);
    }
}
