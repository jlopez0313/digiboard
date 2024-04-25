<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UsuariosAreas extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'usuarios_areas';
    protected $guarded = [];

    public function usuario() {
        return $this->hasOne(User::class, 'id', 'usuarios_id');
    }

    public function area() {
        return $this->hasOne(Areas::class, 'id', 'areas_id');
    }
}
