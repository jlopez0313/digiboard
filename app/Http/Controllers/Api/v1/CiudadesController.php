<?php 

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;
use App\Models\Ciudades;
use App\Http\Resources\CiudadesResource;

class CiudadesController extends Controller {

    public function byDepto( $depto )
    {
        return CiudadesResource::collection(
            Ciudades::with('departamento')
            ->where('depto_id', $depto)
            ->orderBy('ciudad')
            ->get()
        );
    }
}
