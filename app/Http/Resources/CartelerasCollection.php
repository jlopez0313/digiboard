<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CartelerasCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        if (is_null($this->resource)) {
            return [];
        }

        return $this->collection->map->only(
            'id',
            'campana',
            'pantallas',
            'diseno',
            'orientaciones_id',
            'orientacion_label',
            'fecha_inicial',
            'fecha_final',
            'marquesina',
            'multimedias',
            'media',
            'medias',
        );
    }
}
