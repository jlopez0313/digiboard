<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CampanasResource extends JsonResource
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
            'nombre' => $this->nombre,
            'cartelera' => $this->cartelera,
            'evaluador' => $this->evaluador,
            'evaluaciones' => $this->evaluaciones,

            'eje' => $this->eje,
            'objetivo' => $this->objetivo,
            'impacto' => $this->impacto,
            'pregunta' => $this->pregunta,

            'logro_esperado' => $this->logro_esperado,
            'logro_alcanzado' => $this->logro_alcanzado,
            'observacion' => $this->observacion,

            'evaluador_id' => $this->evaluador_id,
            'descripcion_kpi' => $this->descripcion_kpi,

            'valor_min_malo' => $this->valor_min_malo,
            'valor_max_malo' => $this->valor_max_malo,
            'valor_min_regular' => $this->valor_min_regular,
            'valor_max_regular' => $this->valor_max_regular,
            'valor_min_bueno' => $this->valor_min_bueno,
            'valor_max_bueno' => $this->valor_max_bueno,

            'encuesta' => $this->encuesta,
            'tipo_respuesta_id' => $this->tipo_respuesta_id,
            'tipo_respuestas' => $this->tipo_respuestas,
        ];
    }
}
