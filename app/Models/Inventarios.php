<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Inventarios extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'inventarios';
    protected $guarded = [];
    protected $appends = ['origenLabel'];


    public function productos() {
        return $this->hasMany(Productos::class, 'inventarios_id');
    }

    public function getCantidadAttribute( ) {
        return $this->productos->sum('cantidad');
    }

    public function getOrigenLabelAttribute( ) {
        $lista = config('constants.origenes');
        $origenObj = \Arr::first($lista, function($val, $key) {
            return $val['key'] == $this->origen;
        });
        
        return $origenObj['valor'] ?? 'N/A';
    }
}
