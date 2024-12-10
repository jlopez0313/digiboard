<?php 

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Parametros;
use App\Http\Resources\ParametrosResource;
use Intervention\Image\Facades\Image;

class ParametrosController extends Controller {

    public function color(Request $request)
    {
        $parametros = Parametros::firstOrNew();
        $parametros->color = $request->color;
        $parametros->save();

        return new ParametrosResource( $parametros );
    }

    public function logo(Request $request)
    {
        $parametros = Parametros::firstOrNew();
        
        if ( $request->logo ) {
            
            $path = 'logo';

            if ( !file_exists( $path ) ) {
                \File::makeDirectory(storage_path("app/$path"), $mode = 0777, true, true);
            }

            $filename = $request->logo->hashName();

            $resizedImage = Image::make($request->logo)
                                  ->resize(800, 600, function ($constraint) {
                                      $constraint->aspectRatio();
                                      $constraint->upsize();
                                  });

            $fullPath = storage_path("app/$path/$filename");
            $resizedImage->save($fullPath, 100, 'png');
            
            $parametros->logo = "$path/$filename";
        }

        $parametros->save();

        return new ParametrosResource( $parametros );
    }
    
}
