import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import TextInput from "@/Components/Form/TextInput";
import { notify } from "@/Helpers/Notify";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function Dashboard({ auth, contacts, tenant }) {
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState({});

    const filesRef = useRef(null);

    const { data, setData, processing, errors, reset } = useForm({
        logo: "",
    });

    const submit = async (evt) => {
        evt.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        try {
            await axios.post("/api/v1/parametros/logo", formData);
            notify("success", "Parametro registrado satisfactoriamente");
        } catch (error) {
            console.log(error);
            notify("error", "Internal Error");
        } finally {
            setIsLoading(false);
        }
    };

    const onAddFiles = async (evt) => {
        const file = evt.target.files[0];
        
        new Promise((resolve) => {
            const preview = URL.createObjectURL(file);
            const img = new Image();
            img.src = preview;

            img.onload = () => {
                setPreview({ src: preview, mimetype: file.type });

                setData((prevData) => ({
                    ...prevData,
                    logo: file,
                }));
                
                resolve();
            };
        });
    };

    useEffect(() => {
        contacts?.logo && setPreview({ src: "/" + tenant + "/" +  contacts.logo })
    }, [contacts])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Logo
                </h2>
            }
        >
            <Head title="Logo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                    Logo
                                </h2>

                                <div className="mt-5 grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="archivo"
                                            value="Logo de la aplicación"
                                        />

                                        <TextInput
                                            accept="image/*, video/*"
                                            multiple
                                            id="archivo"
                                            name="archivo"
                                            type="file"
                                            value={data.archivo}
                                            className="hidden mt-1 block w-full"
                                            autoComplete="logo"
                                            ref={filesRef}
                                            onChange={onAddFiles}
                                        />

                                        <SecondaryButton
                                            className="w-full text"
                                            disabled={processing}
                                            onClick={() => {
                                                filesRef.current.click();
                                            }}
                                        >
                                            {" "}
                                            Elegir Archivo{" "}
                                        </SecondaryButton>

                                        <InputError
                                            message={errors.archivo}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        {preview.src && (
                                            <div className="grid-item border rounded shadow p-2">
                                                <img
                                                    className="media preview"
                                                    src={preview.src}
                                                    alt=""
                                                />
                                            </div>
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
                                        onClick={() => setIsOpen(false)}
                                        disabled={isLoading}
                                    >
                                        {" "}
                                        Cancelar{" "}
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
