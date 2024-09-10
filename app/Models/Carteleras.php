<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Carteleras extends Model implements HasMedia
{
    use HasFactory;
    use SoftDeletes;
    use InteractsWithMedia;

    protected $table = 'carteleras';
    protected $guarded = [];

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

    public function medias()
    {
        return $this->hasMany(Media::class, 'model_id');
    }
}
