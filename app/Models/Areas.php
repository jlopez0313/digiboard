<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Areas extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'areas';
    protected $guarded = [];

    public function empresa() {
        return $this->hasOne(Empresas::class, 'id', 'empresas_id');
    }
    
    public function ciudad() {
        return $this->hasOne(Ciudades::class, 'id', 'ciudades_id');
    }
}
