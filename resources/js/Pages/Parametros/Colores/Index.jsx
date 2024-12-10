import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import TextInput from "@/Components/Form/TextInput";
import { notify } from "@/Helpers/Notify";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";

export default function Dashboard({ auth, contacts }) {

    const [isLoading, setIsLoading] = useState(false);

    const filesRef = useRef(null);

    const { data, setData, processing, errors, reset } = useForm({
        color: contacts?.color || '#000',
    });

    const submit = async (evt) => {
        evt.preventDefault();

        setIsLoading(true);

        try {
            await axios.post('/api/v1/parametros/color', data);
            notify('success', 'Parametro registrado satisfactoriamente')

        } catch (error) {
            console.log( error )
            notify('error', 'Internal Error')
        } finally {
            setIsLoading(false);
        }
    };

    const onAddColor = async (evt) => {
        setData("color", evt.target.value);
    };

    const onBack = () => {
        router.get('/parametros');
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Colores
                </h2>
            }
        >
            <Head title="Colores" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                    Colores
                                </h2>

                                <div className="mt-5 grid grid-cols-1 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="color"
                                            value="Color de la pantalla"
                                        />

                                        <TextInput
                                            multiple
                                            id="color"
                                            name="color"
                                            type="color"
                                            value={data.color}
                                            className="hidden mt-1 block w-full"
                                            autoComplete="color"
                                            ref={filesRef}
                                            onChange={onAddColor}
                                        />

                                        <SecondaryButton
                                            className="w-full text"
                                            disabled={processing}
                                            onClick={() => {
                                                filesRef.current.click();
                                            }}
                                        >
                                            {" "}
                                            Elegir Color{" "}
                                        </SecondaryButton>

                                        <InputError
                                            message={errors.color}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        {data.color && (
                                            <div
                                                className="grid-item border rounded shadow p-10"
                                                style={{
                                                    background: data.color,
                                                }}
                                            ></div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton
                                        className="ms-4 mx-4"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Guardando..." : "Guardar"}
                                    </PrimaryButton>

                                    <SecondaryButton
                                        type="button"
                                        onClick={() => onBack()}
                                        disabled={isLoading}
                                    >
                                        {" "}
                                        Regresar{" "}
                                    </SecondaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
