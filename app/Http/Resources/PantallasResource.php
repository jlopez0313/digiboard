<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PantallasResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        if (is_null($this->resource)) {
            return [];
        }
        
        return [
            'id' => $this->id,
            'area' => $this->area,
            'cartelera' => $this->cartelera,
            'pantalla' => $this->pantalla,
            'orientaciones_id' => $this->orientaciones_id,
            'orientacion_label' => $this->orientacion_label,
            'code' => $this->code,
            'estado' => $this->area,
            'estado_label' => $this->estado_label,
            'updated_at' => $this->updated_at,
        ];
    }
}
