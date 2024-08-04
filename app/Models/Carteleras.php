<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Carteleras extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'carteleras';
    protected $guarded = [];

    public function campaña() {
        return $this->hasOne(Campanas::class, 'id', 'campanas_id');
    }

    public function diseno() {
        return $this->hasOne(Disenos::class, 'id', 'disenos_id');
    }

    public function multimedias() {
        return $this->hasMany(Multimedias::class, 'carteleras_id');
    }
}
