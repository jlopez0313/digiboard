<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\DepartamentosRequest;
use App\Http\Resources\DepartamentosResource;
use App\Models\Departamentos;
use Inertia\Inertia;


class DepartamentosController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $departamento = Departamentos::create( $data );
        return new DepartamentosResource( $departamento );
    }

    /**
     * Display the specified resource.
     */
    public function show(Departamentos $departamento)
    {
        return new DepartamentosResource( $departamento );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departamentos $departamento)
    {
        $departamento->update( $request->all() );
        return new DepartamentosResource( $departamento );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departamentos $departamento)
    {
        $departamento->delete();
        return new DepartamentosResource( $departamento );
    }
}
