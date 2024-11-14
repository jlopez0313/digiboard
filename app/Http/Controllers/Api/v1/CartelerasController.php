<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartelerasResource;
use App\Http\Resources\PantallasCartelerasResource;
use App\Models\Ciudades;
use App\Models\Areas;
use App\Models\Carteleras;
use App\Models\Multimedias;
use App\Models\Pantallas;
use App\Models\PantallasCarteleras;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

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
            'pantallas_id',
            'deptos_id',
            'ciudades_id',
        );

        $cartelera = Carteleras::create($data);
        
        $multimedias = $request->multimedias ?? [];

        foreach ($multimedias as $file) {
            // $filename = \Storage::disk('media')->put($cartelera->id, $file);
            // $cartelera->addMedia('media/' . $filename)->toMediaCollection();

            $path = 'files/'.$cartelera->id;
            $filename = $file->hashName();

            $resizedImage = Image::make($file)
                                  ->resize(800, 600, function ($constraint) {
                                      $constraint->aspectRatio();
                                      $constraint->upsize();
                                  });

            $fullPath = storage_path("app/$path/$filename");
            $resizedImage->save($fullPath, 100, 'png');
                                          
            Multimedias::create([
                'carteleras_id' => $cartelera->id,
                'src' => "$path/$filename",
                'type' => 'png',
                'mimetype' => $file->getClientMimeType(),
            ]);
        }

        if ($request->pantallas_id) {
            $request->merge(['carteleras_id' => $cartelera->id]);
            $this->asignar($request);
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
        return new CartelerasResource($cartelera);
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
            'pantallas_id',
            'deptos_id',
            'ciudades_id',
            '_method'
        );
        
        $cartelera->update($data);

        $multimedias = $request->multimedias ?? [];

        // 658 x 496 pixeles

        foreach ($multimedias as $file) {
            // $filename = \Storage::disk('media')->put($cartelera->id, $file);
            // $cartelera->addMedia('media/' . $filename)->toMediaCollection();
            
            $path = 'files/'.$cartelera->id;
            $filename = $file->hashName();

            $resizedImage = Image::make($file)
                                  ->resize(800, 600, function ($constraint) {
                                      $constraint->aspectRatio();
                                      $constraint->upsize();
                                  });

            $fullPath = storage_path("app/$path/$filename");
            $resizedImage->save($fullPath, 100, 'png');
                                          
            Multimedias::create([
                'carteleras_id' => $cartelera->id,
                'src' => "$path/$filename",
                'type' => 'png',
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
        if (in_array('ALL', $request->pantallas_id)) {

            $ciudades = [];
            if( $request->deptos_id == 'ALL' ) {
                if ( $request->ciudades_id == 'ALL' ) {
                    $ciudades = Ciudades::pluck('id')
                    ->toArray();
                } else {
                    $ciudades = Ciudades::where('id', $request->ciudades_id)
                    ->pluck('id')
                    ->toArray();
                }
            } else {
                if ( $request->ciudades_id == 'ALL' ) {
                    $ciudades = Ciudades::where('departamentos_id', $request->deptos_id)
                    ->pluck('id')
                    ->toArray();
                } else {
                    $ciudades = Ciudades::where('departamentos_id', $request->deptos_id)
                    ->where('id', $request->ciudades_id)
                    ->pluck('id')
                    ->toArray();
                }
            }

            $areas = [];
            if( $request->areas_id == 'ALL' ) {
                    $areas = Areas::whereIn('ciudades_id', $ciudades)
                    ->pluck('id')
                    ->toArray();
            } else {
                $areas = Areas::where('id', $request->areas_id)
                ->pluck('id')
                ->toArray();
            }

            $remove = PantallasCarteleras::where('carteleras_id', $request->carteleras_id)
            ->delete();

            $all = Pantallas::whereIn('areas_id', $areas)
            ->where('orientaciones_id', $request->orientaciones_id);
            
            $all->update(['carteleras_id' => $request->carteleras_id]);

            $data = [];

            foreach( $all->get() as $pantalla ) {
                $data[] = [
                    'pantallas_id' => $pantalla->id,
                    'carteleras_id' => $request->carteleras_id,
                    'estado' => 'I',
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now(),
                ];
            }

            $assign = PantallasCarteleras::insert($data);
            return $assign;

        } else {

            $remove = PantallasCarteleras::where('carteleras_id', $request->carteleras_id)
            ->whereIn('pantallas_id', $request->pantallas_id)
            ->delete();

            $data = [];

            foreach( $request->pantallas_id as $pantalla ) {
    
                $data[] = [
                    'pantallas_id' => $pantalla,
                    'carteleras_id' => $request->carteleras_id,
                    'estado' => 'I',
                    'created_at' => \Carbon\Carbon::now(),
                    'updated_at' => \Carbon\Carbon::now(),
                ];

                $pantalla = Pantallas::find($pantalla);
                $pantalla->carteleras_id = $request->carteleras_id;
                $pantalla->save();
                
            }

            $assign = PantallasCarteleras::insert($data);
            return $assign;
        }
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
