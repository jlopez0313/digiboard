<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PragmaRX\Google2FA\Google2FA;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'empresas_id',
        'documento',
        'celular',
        'google2fa_secret',        
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Generar la clave secreta de Google 2FA.
     *
     * @return string
     */
    public function generateGoogle2FASecret()
    {
        $google2fa = new Google2FA();
        $secret = $google2fa->generateSecretKey();
        $this->google2fa_secret = $secret;
        $this->save();

        return $secret;
    }

    /**
     * Verificar el código de Google 2FA ingresado por el usuario.
     *
     * @param string $code
     * @return bool
     */
    public function verifyGoogle2FACode($code)
    {
        $google2fa = new Google2FA();
        return $google2fa->verifyKey($this->google2fa_secret, $code);
    }

}
