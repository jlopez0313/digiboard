import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';

export default function QRCode({ QR_Image }) {

    return (
        <>
            <Head title="Escanea el código QR" />
            <h3>Escanea el siguiente código QR con Google Authenticator:</h3>
            <img src={QR_Image} alt="Código QR de 2FA" />

            <Link href="/twofactor">
                <PrimaryButton> Continuar </PrimaryButton>
            </Link>

        </>
    );
}
