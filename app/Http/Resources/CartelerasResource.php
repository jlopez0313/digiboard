<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartelerasResource extends JsonResource
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
            'diseno' => $this->diseno,
            'cartelera' => $this->cartelera,
            'empresa' => $this->empresa,
            'area' => $this->area,
            'pantalla' => $this->pantalla,
            'fecha_inicial' => $this->fecha_inicial,
            'fecha_final' => $this->fecha_final,
            'marquesina' => $this->marquesina,
        ];
    }
}
