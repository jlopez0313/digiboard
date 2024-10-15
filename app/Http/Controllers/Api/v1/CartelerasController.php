<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartelerasResource;
use App\Http\Resources\PantallasCartelerasResource;
use App\Models\Carteleras;
use App\Models\Multimedias;
use App\Models\Pantallas;
use App\Models\PantallasCarteleras;
use Illuminate\Http\Request;

class CartelerasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->except(
            'nombre',
            'eje',
            'objetivo',
            'impacto',
            'pregunta',
            'logro_esperado',
            'evaluador_id',
            'descripcion_kpi',
            'valor_min_malo',
            'valor_max_malo',
            'valor_min_regular',
            'valor_max_regular',
            'valor_min_bueno',
            'valor_max_bueno',
            'encuesta',
            'tipo_respuesta_id',
            'empresas_id',
            'areas_id',
            'multimedias',
            'pantallas',
        );

        $cartelera = Carteleras::create($data);
        
        $multimedias = $request->multimedias ?? [];

        foreach ($multimedias as $file) {
            // $filename = \Storage::disk('media')->put($cartelera->id, $file);
            // $cartelera->addMedia('media/' . $filename)->toMediaCollection();

            $filename = $file->store('files/'.$cartelera->id);
            
            Multimedias::create([
                'carteleras_id' => $cartelera->id,
                'src' => $filename,
                'type' => $file->getClientOriginalExtension(),
                'mimetype' => $file->getClientMimeType(),
            ]);
            
        }

        if ($request->pantallas) {
            $pantallas = explode(',', $request->pantallas);

            $request->merge(['carteleras_id' => $cartelera->id]);

            foreach ($pantallas as $pantalla) {
                $request->merge(['pantallas_id' => $pantalla]);
                $this->asignar($request);
            }
        }
        
        $this->makeLink();

        return new CartelerasResource($cartelera);
    }

    /**
     * Display the specified resource.
     */
    public function show(Carteleras $cartelera)
    {
/*
        $cartelera->getMedia();

        foreach( $cartelera->media as $key => $mediaItems ) {
            $cartelera->media[$key]['publicUrl'] = $mediaItems->getUrl();
            $cartelera->media[$key]['publicFullUrl'] = $mediaItems->getFullUrl(); //url including domain
            $cartelera->media[$key]['fullPathOnDisk'] = $mediaItems->getPath();
        }
*/
        return response()->json([
            'tenant' => tenant(),
            'data' => new CartelerasResource($cartelera),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Carteleras $cartelera)
    {
        $data = $request->except(
            'nombre',
            'eje',
            'objetivo',
            'impacto',
            'pregunta',
            'logro_esperado',
            'evaluador_id',
            'descripcion_kpi',
            'valor_min_malo',
            'valor_max_malo',
            'valor_min_regular',
            'valor_max_regular',
            'valor_min_bueno',
            'valor_max_bueno',
            'encuesta',
            'tipo_respuesta_id',
            'empresas_id',
            'areas_id',
            'multimedias',
            'pantallas',
            '_method'
        );
        
        $cartelera->update($data);

        $multimedias = $request->multimedias ?? [];

        // 658 x 496 pixeles

        foreach ($multimedias as $file) {
            // $filename = \Storage::disk('media')->put($cartelera->id, $file);
            // $cartelera->addMedia('media/' . $filename)->toMediaCollection();
            
            $filename = $file->store('files/'.$cartelera->id);

            Multimedias::create([
                'carteleras_id' => $cartelera->id,
                'src' => $filename,
                'type' => $file->getClientOriginalExtension(),
                'mimetype' => $file->getClientMimeType(),
            ]);
        }

        $this->makeLink();

        return new CartelerasResource($cartelera);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carteleras $cartelera)
    {
        $cartelera->delete();

        return new CartelerasResource($cartelera);
    }

    public function asignar(Request $request)
    {
        $data = [];
        $data['pantallas_id'] = $request->pantallas_id;
        $data['carteleras_id'] = $request->carteleras_id;
        $data['estado'] = 'I';

        $assign = PantallasCarteleras::create($data);

        $pantalla = Pantallas::find($data['pantallas_id']);
        $pantalla->carteleras_id = $data['carteleras_id'];
        $pantalla->save();

        return new PantallasCartelerasResource($assign);
    }

    public function desasignar(Request $request, PantallasCarteleras $pantalla_cartelera)
    {
        $pantalla_cartelera->delete();

        return new PantallasCartelerasResource($pantalla_cartelera);
    }

    public function makeLink() {
        if  ( !is_link( 'tenant_' . tenant()->id ) ) {
            symlink(storage_path() . '/app', 'tenant_' . tenant()->id);
        }
    }
}
