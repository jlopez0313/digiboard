<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recaudos extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'recaudos';
    protected $guarded = [];

    public function factura() {
        return $this->hasOne(Facturas::class, 'id', 'facturas_id');
    }
    
}
