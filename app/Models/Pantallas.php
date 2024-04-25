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

    public function area() {
        return $this->hasOne(Areas::class, 'id', 'areas_id');
    }
    
    public function carteleras() {
        return $this->hasMany(PantallasCarteleras::class, 'pantallas_id');
    }
}
