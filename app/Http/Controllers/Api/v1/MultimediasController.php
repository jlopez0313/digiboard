<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Resources\MultimediasResource;
use App\Models\Multimedias;
use Inertia\Inertia;


class MultimediasController extends Controller
{
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Multimedias $multimedia)
    {
        $multimedia->delete();
        \Storage::delete( $multimedia->src );
        return new MultimediasResource( $multimedia );
    }
}
