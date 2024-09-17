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
            'cartelera',
            'evaluaciones',
            'evaluador',
            'eje',
            'objetivo',
            'impacto',
            'pregunta',
            'logro_esperado',
            'logro_alcanzado',
            'observacion',
            'evaluador_id',
            'descripcion_kpi',
            'valor_min_malo',
            'valor_max_malo',
            'valor_min_regular',
            'valor_max_regular',
            'valor_min_bueno',
            'valor_max_bueno',
            'encuesta',
            'tipo_respuesta_id',
            'tipo_respuestas'
        );
    }
}
