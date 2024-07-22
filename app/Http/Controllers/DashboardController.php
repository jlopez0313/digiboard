<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use Inertia\Inertia;

use App\Http\Resources\PantallasCollection;
use App\Models\Pantallas;



class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $all = Pantallas::with('cartelera')
        ->orderByDesc('updated_at')
        ->get();

        return Inertia::render('Dashboard/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'contacts' => new PantallasCollection( $all ),
        ]);
    }

}
