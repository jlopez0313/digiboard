<?php 

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Ciudades;
use App\Http\Resources\CiudadesResource;

class CiudadesController extends Controller {

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $ciudad = Ciudades::create( $data );
        return new CiudadesResource( $ciudad );
    }

    /**
     * Display the specified resource.
     */
    public function show(Ciudades $ciudade)
    {
        return new CiudadesResource( $ciudade );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ciudades $ciudade)
    {
        $ciudade->update( $request->all() );
        return new CiudadesResource( $ciudade );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ciudades $ciudade)
    {
        $ciudade->delete();
        return new CiudadesResource( $ciudade );
    }
    
    public function byDepartamento( $departamento )
    {
        return CiudadesResource::collection(
            Ciudades::where('departamentos_id', $departamento)
            ->orderBy('ciudad')
            ->get()
        );
    }
}
