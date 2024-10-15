<?php

namespace App\Listeners;

use App\Events\TenantCreated; // Suponiendo que tienes un evento TenantCreated
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SetTenantFolderPermissions
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
         // Suponiendo que $event->tenant contiene el tenant recién creado
         $tenantId = $event->tenant->id;
         $tenantFolder = storage_path($tenantId);
 
         if (!file_exists($tenantFolder)) {
             mkdir($tenantFolder, 0755, true); // Crear la carpeta
         }
 
         // Cambiar los permisos a 777
         chmod($tenantFolder, 0777);
    }
}
