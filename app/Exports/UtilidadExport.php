<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

use App\Models\Facturas;
use App\Models\Gastos;
use App\Models\Productos;
use App\Models\Recaudos;

class UtilidadExport implements FromView
{
    public function __construct($data)
    {
        $this->data = $data;
    }

    public function view(): View
    {
        $facturas = Facturas::with(
            'cliente', 'detalles.producto.inventario',
        )->get();

        return view('exports.utilidad', [
            'facturas' => $facturas,
            'inventario' => $this->onSetProductos( Productos::get() ),
            'compraCredito' => $this->onSetCompraCredito($facturas),
            'compraContado' => $this->onSetCompraContado($facturas),
            'recaudos' => $this->onSetRecaudos( Recaudos::get() ),
            'gastos' => $this->onSetGastos( Gastos::get() ),
        ]);
    }

    public function onSetProductos($productos) {
        return $productos->reduce( function ($sum, $prod ) {
            return $sum + ($prod->cantidad * $prod->precio );
        }, 0) ;
    }

    public function onSetCompraCredito($facturas) {
        $lista = $facturas->filter( 
            function ($item) { 
                return $item->forma_pago?->id == "1" ;
        });

        $total = $lista->map( function ($item) {
            return (
                $item->detalles->reduce(
                    function ($sum, $det) { 
                        return $sum + ($det->precio_venta * $det->cantidad) ;
                    },
                    0
                ) ?? 0
            );
        });

        $nacional = $lista->map( function($item) { return $item->detalles?->filter( function ($detalle) { return $detalle->producto?->inventario?->origen == 'N' ;} ) ?? []; }) ;
        $importado = $lista->map( function($item) { return $item->detalles?->filter( function ($detalle) { return $detalle->producto?->inventario?->origen == 'I' ;} ) ?? []; }) ;

        return [
            'total' => $total->reduce( function ($sum, $item) { return $sum + $item ; }, 0),
            'nacional' => $nacional->flatten(1)->reduce( function ($sum, $item) { return $sum + ( ($item['cantidad'] ?? 0) * ($item['precio_venta'] ?? 0) ) ;}, 0),
            'importado' => $importado->flatten(1)->reduce( function ($sum, $item) { return $sum + ( ($item['cantidad'] ?? 0) * ($item['precio_venta'] ?? 0) ) ;}, 0),
        ] ;
    }

    public function onSetCompraContado($facturas) {
        $lista = $facturas->filter( 
            function ($item) { 
                return $item->forma_pago?->id == "2" ;
        });

        $total = $lista->map( function ($item) {
            return (
                $item->$detalles->reduce(
                    function ($sum, $det) { 
                        return $sum + ($det->precio_venta * $det->cantidad) ;
                    },
                    0
                ) ?? 0
            );
        });

        $nacional = $lista->map( function($item) { return $item->detalles?->filter( function ($detalle) { return $detalle->producto?->inventario?->origen == 'N' ;} ) ?? []; }) ;
        $importado = $lista->map( function($item) { return $item->detalles?->filter( function ($detalle) { return $detalle->producto?->inventario?->origen == 'I' ;} ) ?? []; }) ;

        return [
            'total' => $total->reduce( function ($sum, $item) { return $sum + $item ; }, 0),
            'nacional' => $nacional->flatten(1)->reduce( function ($sum, $item) { return $sum + ( ($item['cantidad'] ?? 0) * ($item['precio_venta'] ?? 0) ) ;}, 0),
            'importado' => $importado->flatten(1)->reduce( function ($sum, $item) { return $sum + ( ($item['cantidad'] ?? 0) * ($item['precio_venta'] ?? 0) ) ;}, 0),
        ] ;
    }

    public function onSetRecaudos($recaudos) {
        return $recaudos->reduce( function ($sum, $prod ) {
            return $sum + $prod->valor;
        }, 0);
    }

    public function onSetGastos($gastos) {
        $total = $gastos->reduce (
            function ($sum, $det) {
                return $sum + $det->valor;
            }, 
            0
        );

        $nacional = $gastos->filter( function ($detalle) { return $detalle->origen == 'N' ; }  ) ?? [];

        $importado = $gastos->filter( function ($detalle) { return $detalle->origen == 'I' ; } ) ?? [] ;
        
        return [
            'total' => $total,
            'nacional' =>  $nacional->flatten(1)->reduce( function ($sum, $det) { return $sum + $det->valor ;}, 0),
            'importado' =>  $importado->flatten(1)->reduce( function ($sum, $det) { return $sum + $det->valor ;}, 0),
        ] ;
    }

}
