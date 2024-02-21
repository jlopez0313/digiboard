<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Facturas extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'facturas';
    protected $guarded = [];

    public function cliente() {
        return $this->hasOne(Clientes::class, 'id', 'clientes_id');
    }

    public function detalles() {
        return $this->hasMany(Detalles::class, 'facturas_id');
    }

    public function recaudos() {
        return $this->hasMany(Recaudos::class, 'facturas_id');
    }

    public function getFormaPagoAttribute() {
        $lista = config('constants.payments');
        $origenObj = \Arr::first($lista, function($val, $key) {
            return $val['key'] == $this->tipo_pago;
        });
        
        return $origenObj['valor'] ?? 'N/A';
    }

    public function getCreatedAtAttribute( $date ) {
        return $date;
        // return \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y-m-d H:i:s');
    }
    
}
