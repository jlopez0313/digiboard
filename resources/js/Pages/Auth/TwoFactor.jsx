import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import TextInput from "@/Components/Form/TextInput";
import InputLabel from "@/Components/Form/InputLabel";
import InputError from "@/Components/Form/InputError";

export default function TwoFactor() {
    const [code, setCode] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        code: "",
    });

    const submit = async (e) => {
        e.preventDefault();
        post("/twofactor");
        // await axios.post('/api/v2/twofactor', data)
    };

    return (
        <GuestLayout>
            <Head title="Autenticación de dos factores" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel
                        htmlFor="code"
                        value="Código de Google Authenticator"
                    />

                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        value={data.code}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        required={true}
                        onChange={(e) => setData("code", e.target.value)}
                    />

                    <InputError message={errors.code} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton type="submit">
                        Verificar código
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
