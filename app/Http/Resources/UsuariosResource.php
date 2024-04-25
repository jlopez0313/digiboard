<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuariosResource extends JsonResource
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
            'empresa' => $this->empresa,
            'name' => $this->name,
            'email' => $this->email,
            'is_admin' => $this->is_admin,
            'documento' => $this->documento,
            'celular' => $this->celular,
        ];
    }
}
