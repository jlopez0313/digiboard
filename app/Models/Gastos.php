<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gastos extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'gastos';
    protected $guarded = [];
    
    public function concepto() {
        return $this->hasOne(Conceptos::class, 'id', 'conceptos_id');
    }

    public function cliente() {
        return $this->hasOne(Clientes::class, 'id', 'clientes_id');
    }

    public function getCreatedAtAttribute( $date ) {
        return \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y-m-d H:i:s');
    }

    public function getOrigenLabelAttribute( ) {
        $lista = config('constants.origenes');
        $origenObj = \Arr::first($lista, function($val, $key) {
            return $val['key'] == $this->origen;
        });
        
        return $origenObj['valor'] ?? 'N/A';
    }

}
