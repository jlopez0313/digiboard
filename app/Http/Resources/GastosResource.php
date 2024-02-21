<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GastosResource extends JsonResource
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
            'cliente' => $this->cliente,
            'concepto' => $this->concepto,
            'valor' => $this->valor,
            'origen' => $this->origen,
            'created_at' => $this->created_at,
        ];
    }
}
