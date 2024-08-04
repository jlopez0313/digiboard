<?php 

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Campanas;
use App\Http\Resources\CampanasResource;

class CampanasController extends Controller {

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $ciudad = Campanas::create( $data );
        return new CampanasResource( $ciudad );
    }

    /**
     * Display the specified resource.
     */
    public function show(Campanas $campana)
    {
        return new CampanasResource( $campana );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Campanas $campana)
    {
        $campana->update( $request->all() );
        return new CampanasResource( $campana );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campanas $campana)
    {
        $campana->delete();
        return new CampanasResource( $campana );
    }
    
}
