<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Detalles extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'detalles';
    protected $guarded = [];

    public function factura() {
        return $this->hasOne(Facturas::class, 'id', 'facturas_id');
    }

    public function producto() {
        return $this->hasOne(Productos::class, 'id', 'productos_id');
    }
}
