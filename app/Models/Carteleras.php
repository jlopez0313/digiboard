<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Carteleras extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'carteleras';
    protected $guarded = [];
    protected $append = ['media'];

    protected $casts = [
        'updated_at' => 'datetime:Y-m-d H:i A',
    ];

    public function campana()
    {
        return $this->hasOne(Campanas::class, 'id', 'campanas_id');
    }

    public function diseno()
    {
        return $this->hasOne(Disenos::class, 'id', 'disenos_id');
    }

    public function multimedias()
    {
        return $this->hasMany(Multimedias::class, 'carteleras_id');
    }
    
    public function pantallas() {
        return $this->hasMany(Pantallas::class, 'carteleras_id');
    }

    protected function serializeDate($date): string {
        return $date->format('Y-m-d H:i:s');
    }

    public function getOrientacionLabelAttribute() {
        $lista = config('constants.orientaciones');
        $origenObj = \Arr::first($lista, function($val, $key) {
            return $val['key'] == $this->orientaciones_id;
        });
        
        return $origenObj['valor'] ?? 'N/A';
    }
}
