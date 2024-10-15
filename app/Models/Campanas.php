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

    public function cartelera() {
        return $this->hasOne(Carteleras::class, 'campanas_id');
    }

    public function evaluador() {
        return $this->hasOne(User::class, 'id', 'evaluador_id');
    }

    public function evaluaciones() {
        return $this->hasMany(Evaluaciones::class, 'campanas_id');
    }

    public function getTipoRespuestasAttribute() {
        $lista = config('constants.tipo_respuesta');
        $origenObj = \Arr::first($lista, function($val, $key) {
            return $val['id'] == $this->tipo_respuesta_id;
        });
        
        return $origenObj['respuestas'] ?? [];
    }
}
