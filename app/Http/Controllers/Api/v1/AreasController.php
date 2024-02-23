<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\areasRequest;
use App\Http\Resources\areasResource;
use App\Models\Areas;
use Inertia\Inertia;


class AreasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->except(['departamentos_id']);
        $area = Areas::create( $data );
        return new AreasResource( $area );
    }

    /**
     * Display the specified resource.
     */
    public function show(Areas $area)
    {
        return new AreasResource( $area );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Areas $area)
    {
        $data = $request->except(['departamentos_id']);
        $area->update( $data );
        return new AreasResource( $area );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Areas $area)
    {
        $area->delete();
        return new AreasResource( $area );
    }
}
