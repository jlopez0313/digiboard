<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pantallas extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'pantallas';
    protected $guarded = [];

    public $timestamps = true;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i A',
        'updated_at' => 'datetime:Y-m-d H:i A',
    ];

    public function area() {
        return $this->hasOne(Areas::class, 'id', 'areas_id');
    }
    
    public function cartelera() {
        return $this->hasOne(Carteleras::class, 'id', 'carteleras_id');
    }

    public function getEstadoLabelAttribute() {
        $lista = config('constants.estados');
        $origenObj = \Arr::first($lista, function($val, $key) {
            return $val['key'] == $this->estado;
        });
        
        return $origenObj['valor'] ?? 'N/A';
    }

    public function getOrientacionLabelAttribute() {
        $lista = config('constants.orientaciones');
        $origenObj = \Arr::first($lista, function($val, $key) {
            return $val['key'] == $this->orientaciones_id;
        });
        
        return $origenObj['valor'] ?? 'N/A';
    }

    public function getUpdatedAtAttribute( $date ) {
        return \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y-m-d H:i:s');
    }

    public function getCreatedAtAttribute( $date ) {
        return \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('Y-m-d H:i:s');
    }
    
    protected function serializeDate($date): string {
        return $date->format('Y-m-d H:i:s');
    }
}
