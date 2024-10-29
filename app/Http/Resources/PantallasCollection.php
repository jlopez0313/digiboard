<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PantallasCollection extends ResourceCollection
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
            'area',
            'cartelera',
            'pantalla',
            'orientaciones_id',
            'orientacion_label',
            'code',
            'estado',
            'estado_label',
            'updated_at'
        );
    }
}
