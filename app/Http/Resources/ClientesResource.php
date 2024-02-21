<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientesResource extends JsonResource
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
            'documento' => $this->documento,
            'ciudad' => $this->ciudad,
            'nombre' => $this->nombre,
            'direccion' => $this->direccion,
            'tipo' => $this->tipo,
            'celular' => $this->celular,
        ];
    }
}
