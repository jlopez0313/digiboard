<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PantallasCartelerasResource extends JsonResource
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
            'cartelera' => $this->cartelera,
            'pantalla' => $this->pantalla,
            'estado' => $this->estado,
            'code' => $this->code,
            'estado_label' => $this->estado_label,
        ];
    }
}
