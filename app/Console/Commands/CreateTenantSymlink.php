<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CreateTenantSymlink extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tenant:link {tenantId}';
    
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crea un symlink en la carpeta public para los archivos del tenant';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tenantId = $this->argument('tenantId');
        $storagePath = storage_path('tenant_' . $tenantId . '/app/files');
        $publicPath = public_path('tenant_' . $tenantId);

        // Verificar si la carpeta del tenant en storage existe
        if (!File::exists($storagePath)) {
            $this->error("La carpeta del tenant no existe en storage: {$storagePath}");
            return;
        }

        // Crear el symlink si no existe
        if (!File::exists($publicPath)) {
            File::link($storagePath, $publicPath);
            $this->info("Symlink creado: {$publicPath} --> {$storagePath}");
        } else {
            $this->info("El symlink ya existe: {$publicPath}");
        }
    }
}
