<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ciudades extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'ciudades';
    protected $guarded = [];
    
    public function departamento() {
        return $this->hasOne(Departamentos::class, 'id', 'depto_id');
    }
}
