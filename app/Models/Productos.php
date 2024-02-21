<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Productos extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'productos';
    protected $guarded = [];

    public function inventario() {
        return $this->hasOne(Inventarios::class, 'id', 'inventarios_id');
    }

    public function color() {
        return $this->hasOne(Colores::class, 'id', 'medidas_id');
    }

    public function medida() {
        return $this->hasOne(Medidas::class, 'id', 'colores_id');
    }

    public function detalles() {
        return $this->hasMany(Detalles::class, 'facturas_id');
    }

}
