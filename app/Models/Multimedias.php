<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Multimedias extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'multimedias';
    protected $guarded = [];

    public function cartelera() {
        return $this->hasOne(Carteleras::class, 'id', 'carteleras_id');
    }
}
