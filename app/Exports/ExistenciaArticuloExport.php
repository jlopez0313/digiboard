<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

use App\Models\Facturas;
use App\Models\Gastos;
use App\Models\Inventarios;
use App\Models\Productos;

class ExistenciaArticuloExport implements FromView
{
    public function __construct($data)
    {
        $this->data = $data;
    }

    public function view(): View
    {
        $query = Inventarios::with('productos.color', 'productos.medida')
            ->find( $this->data['inventario'] )
        ;

        
        return view('exports.existencia_articulo', [
            'invoices' => $query
        ]);
    }
}
