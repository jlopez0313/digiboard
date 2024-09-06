<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;
    
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i A',
    ];

    public function domain() {
        return $this->hasOne(Domain::class, 'tenant_id', 'id');
    }


    public function getCreatedAtAttribute( $date ) {
        return \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y-m-d H:i:s');
    }
}