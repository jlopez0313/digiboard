<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\TenantsRequest;
use App\Http\Resources\TenantsResource;
use App\Models\Tenant;
use Inertia\Inertia;


class TenantsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $name = str_replace(' ', '_', $data['tenant']);
        $tenant = Tenant::create(['id' => $name ]);
        $tenant->domains()->create(['domain' => $name . '.' . env('APP_DOMAIN') ]);

        return new TenantsResource( $tenant );
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant)
    {
        return new TenantsResource( $tenant );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tenant $tenant)
    {
        $tenant->update( $request->all() );
        return new TenantsResource( $tenant );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tenant $tenant)
    {
        $tenant->delete();
        return new TenantsResource( $tenant );
    }
}
