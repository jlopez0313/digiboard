<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Verify2FA
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $user = Auth::user();

        if ($user && $user->google2fa_secret != null ) {
            if (!session('2fa_verified')) {
                return redirect()->to('twofactor');
            }
        }

        return $next($request);
    }
}
