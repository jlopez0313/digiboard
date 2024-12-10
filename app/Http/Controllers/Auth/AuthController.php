<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;

use PragmaRX\Google2FA\Google2FA;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;

class AuthController extends Controller
{
    /**
     * Mostrar el formulario de login.
     *
     * @return \Inertia\Response
     */
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Iniciar sesión del usuario y redirigir según la verificación 2FA.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (\Auth::attempt($credentials)) {
            $user = \Auth::user();

            // Si el usuario tiene 2FA activado
            if ($user->google2fa_secret != null) {
                return redirect()->to('twofactor');
            } else {
                return redirect()->to('generate-qr');                
            }
        }

        return back()->withErrors(['user' => 'Credenciales Invalidas']);
    }

    /**
     * Mostrar el formulario para el código de 2FA.
     *
     * @return \Inertia\Response
     */
    public function showTwoFactorForm()
    {
        return Inertia::render('Auth/TwoFactor');
    }


    /**
     * Verificar el código 2FA y redirigir al dashboard.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function verifyTwoFactor(Request $request)
    {
        $user = $request->user();

        if ($user->verifyGoogle2FACode($request->input('code'))) {
            
            session(['2fa_verified' => true]);
            return redirect()->to('dashboard');
        }

        return back()->withErrors(['code' => 'Código de autenticación inválido']);
    }

    /**
     * Generar el código QR para Google Authenticator.
     *
     * @return \Inertia\Response
     */
    public function generateQRCode()
    {
        $google2fa = new Google2FA();
        $secret = Auth::user()->generateGoogle2FASecret();
        $QR_Image = $google2fa->getQRCodeUrl(
            'Digiboard', // Nombre de tu aplicación
            Auth::user()->email,
            $secret
        );

        $qrCode = new QrCode($QR_Image);
        $writer = new PngWriter();
        $imageData = $writer->write($qrCode);  // Esto generará la imagen del QR en formato PNG
    
        // Guardar la imagen temporalmente o pasarla a la vista
        $qrImageBase64 = base64_encode($imageData->getString());  // Codificar en base64 para incluirlo en HTML
    
        return Inertia::render('Auth/QRCode', [
            'QR_Image' => 'data:image/png;base64,' . $qrImageBase64
        ]);
    }
}
