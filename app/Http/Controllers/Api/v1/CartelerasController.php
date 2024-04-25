<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\CartelerasRequest;
use App\Http\Resources\CartelerasResource;
use App\Http\Resources\PantallasCartelerasResource;
use App\Models\Carteleras;
use App\Models\PantallasCarteleras;
use App\Models\Multimedias;
use Inertia\Inertia;

class CartelerasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->except('empresas_id', 'areas_id', 'multimedias');
        $cartelera = Carteleras::create( $data );

        $multimedias = $request->multimedias;

        foreach($multimedias as $file) {
            $filename = $file->store('files/' . $cartelera->id);
            
            Multimedias::create([
                'carteleras_id' => $cartelera->id,
                'src' => $filename,
                'type' => $file->getClientOriginalExtension(),
                'mimetype' => $file->getClientMimeType(),
            ]);
        }

        return new CartelerasResource( $cartelera );
    }

    /**
     * Display the specified resource.
     */
    public function show(Carteleras $cartelera)
    {
        return new CartelerasResource( $cartelera );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Carteleras $cartelera)
    {
        $data = $request->except('empresas_id', 'areas_id', 'multimedias', '_method');
        $cartelera->update( $data );

        $multimedias = $request->multimedias;

        // 658 x 496 pixeles

        foreach($multimedias as $file) {
            $filename = $file->store('files/' . $cartelera->id);
            Multimedias::create([
                'carteleras_id' => $cartelera->id,
                'src' => $filename,
                'type' => $file->getClientOriginalExtension(),
                'mimetype' => $file->getClientMimeType(),
            ]);
        }
        
        return new CartelerasResource( $cartelera );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carteleras $cartelera)
    {
        $cartelera->delete();
        return new CartelerasResource( $cartelera );
    }


    public function asignar(Request $request)
    {
        $data = $request->except(['empresas_id', 'areas_id']);
        $data['estado'] = 'I';
        $data['code'] =  bin2hex( random_bytes(3) );
        $assign = PantallasCarteleras::create( $data );
        
        return new PantallasCartelerasResource( $assign );
    }

    public function desasignar(Request $request, PantallasCarteleras $pantalla_cartelera)
    {
        $pantalla_cartelera->delete();
        return new PantallasCartelerasResource( $pantalla_cartelera );
    }

    public function codigo(Request $request, PantallasCarteleras $pantalla_cartelera) {

        if( $pantalla_cartelera->code == $request->password ) {
            return new PantallasCartelerasResource( $pantalla_cartelera );
        } else {
            return null;
        }
        
    }
}
