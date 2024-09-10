<?php

function getImpuestos($item)
{
    $impuestos = 0;

    foreach ($item->producto?->impuestos as $impto) {
        if ($impto->impuesto->tipo_tarifa == 'P') {
            $impuestos +=
                (($item->precio_venta ?? 0) *
                    $impto->impuesto->tarifa) /
                100;
        } elseif ($impto->impuesto->tipo_tarifa == 'V') {
            $impuestos += $impto->impuesto->tarifa;
        }
    }

    return $impuestos;
}
