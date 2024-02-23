<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\EmpresasRequest;
use App\Http\Resources\EmpresasResource;
use App\Models\Empresas;
use Inertia\Inertia;


class EmpresasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $empresa = Empresas::create( $request->all() );
        return new EmpresasResource( $empresa );
    }

    /**
     * Display the specified resource.
     */
    public function show(Empresas $empresa)
    {
        return new EmpresasResource($empresa);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Empresas $empresa)
    {
        $empresa->update( $request->all() );
        return new EmpresasResource( $empresa );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Empresas $empresa)
    {
        $empresa->delete();
        return new EmpresasResource( $empresa );
    }

    public function byDocument( $cedula ) {
        $empresa = Empresas::with('tipo', 'ciudad.departamento')
        ->where('documento', $cedula)
        ->first();

        return new EmpresasResource(
            $empresa
        );        
    }
}
