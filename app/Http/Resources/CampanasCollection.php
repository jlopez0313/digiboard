<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CampanasCollection extends ResourceCollection
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
            'nombre',
            'carteleras',
            'evaluador',
            'eje',
            'objetivo',
            'impacto',
            'pregunta',
            'logro_esperado',
            'evaluador_id',
            'descripcion_kpi',
            'valor_malo',
            'valor_regular',
            'valor_bueno',
            'encuesta',
            'tipo_respuesta_id',
            'tipo_respuestas'
        );
    }
}
