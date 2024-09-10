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
            'carteleras' => $this->carteleras,
            'evaluador' => $this->evaluador,

            'eje' => $this->eje,
            'objetivo' => $this->objetivo,
            'impacto' => $this->impacto,
            'pregunta' => $this->pregunta,

            'logro_esperado' => $this->logro_esperado,
            'evaluador_id' => $this->evaluador_id,
            'descripcion_kpi' => $this->descripcion_kpi,
            'valor_malo' => $this->valor_malo,
            'valor_regular' => $this->valor_regular,
            'valor_bueno' => $this->valor_bueno,

            'encuesta' => $this->encuesta,
            'tipo_respuesta_id' => $this->tipo_respuesta_id,
            'tipo_respuestas' => $this->tipo_respuestas,
        ];
    }
}
