<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\BancosRequest;
use App\Http\Resources\BancosResource;
use App\Models\Bancos;
use Inertia\Inertia;


class BancosController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $banco = Bancos::create( $data );
        return new BancosResource( $banco );
    }

    /**
     * Display the specified resource.
     */
    public function show(Bancos $banco)
    {
        return new BancosResource( $banco );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bancos $banco)
    {
        $banco->update( $request->all() );
        return new BancosResource( $banco );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bancos $banco)
    {
        $banco->delete();
        return new BancosResource( $banco );
    }
}
