<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmpresasResource extends JsonResource
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
            'nit' => $this->nit,
            'empresa' => $this->empresa,
            'logo' => $this->logo,
            'correo' => $this->correo,
            'celular' => $this->celular,
        ];
    }
}
