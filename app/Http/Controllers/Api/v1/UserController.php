<?php 

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\UserResource;

class UserController extends Controller {

    public function getAdmin( Request $request )
    {
        $user = User::where('roles_id', '1')->first();

        if ($user && \Hash::check( $request->password, $user->password ) ) {

            return new UserResource($user);

        } else {
            return null;
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['password'] = \Hash::make($request->password);
        $usuario = User::create( $data );
        return new UserResource( $usuario );
    }

    /**
     * Display the specified resource.
     */
    public function show(User $usuario)
    {
        return new UserResource( $usuario );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $usuario)
    {
        $data = $request->password ? $request->all() : $request->except(['password']);

        if( $request->password ) {
            $data['password'] = \Hash::make($request->password);
        }
        
        $usuario->update( $data );
        return new UserResource( $usuario );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $usuario)
    {
        $usuario->delete();
        return new UserResource( $usuario );
    }


}
