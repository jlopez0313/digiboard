<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetallesResource extends JsonResource
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
            'facturas_id' => $this->facturas_id,
            'productos_id' => $this->productos_id,
            'precio_venta' => $this->precio_venta,
            'cantidad' => $this->cantidad,
        ];
    }
}
