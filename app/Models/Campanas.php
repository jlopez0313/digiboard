<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Campanas extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'campanas';
    protected $guarded = [];
    protected $append = ['tipo_respuestas'];

    public function carteleras() {
        return $this->hasMany(Carteleras::class, 'campanas_id');
    }

    public function evaluador() {
        return $this->hasOne(USer::class, 'id', 'usuarios_id');
    }

    public function getTipoRespuestasAttribute() {
        $lista = config('constants.tipo_respuesta');
        $origenObj = \Arr::first($lista, function($val, $key) {
            return $val['id'] == $this->tipo_respuesta_id;
        });
        
        return $origenObj['respuestas'] ?? [];
    }
}
