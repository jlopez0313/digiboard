<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\UsuariosRequest;
use App\Http\Resources\UsuariosResource;
use App\Http\Resources\UsuariosAreasResource;
use App\Models\UsuariosAreas;
use App\Models\User;

use Inertia\Inertia;


class UsuariosController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all() ;
        $data['is_admin'] = $request->is_admin ? 1 : 0;
        $data['password'] = \Hash::make( $data['documento'] );
        $pantalla = User::create( $data );
        return new UsuariosResource( $pantalla );
    }

    /**
     * Display the specified resource.
     */
    public function show(User $usuario)
    {
        return new UsuariosResource( $usuario );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $usuario)
    {
        $data = $request->all() ;
        $usuario->update( $data );
        return new UsuariosResource( $usuario );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $usuario)
    {
        $usuario->delete();
        return new UsuariosResource( $usuario );
    }

    public function asignar(Request $request)
    {
        $data = $request->all();
        $assign = UsuariosAreas::create( $data );
        
        return new UsuariosAreasResource( $assign );
    }

    public function desasignar(Request $request, UsuariosAreas $usuario_area)
    {
        $usuario_area->delete();
        return new UsuariosAreasResource( $usuario_area );
    }
}
