<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PantallasCarteleras extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'pantallas_carteleras';
    protected $guarded = [];

    public function cartelera() {
        return $this->hasOne(Carteleras::class, 'id', 'carteleras_id');
    }

    public function pantalla() {
        return $this->hasOne(Pantallas::class, 'id', 'pantallas_id');
    }

    public function getEstadoLabelAttribute() {
        $lista = config('constants.estados');
        $origenObj = \Arr::first($lista, function($val, $key) {
            return $val['key'] == $this->estado;
        });
        
        return $origenObj['valor'] ?? 'N/A';
    }
}
