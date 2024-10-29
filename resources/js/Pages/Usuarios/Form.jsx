import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "@/Components/Form/Select";
import Checkbox from "@/Components/Form/Checkbox";

export const Form = ({ id, setIsOpen, onReload }) => {

    const { data, setData, processing, errors, reset } = useForm({
        name: '',
        email: '',
        documento: '',
        celular: '',
        is_admin: ''
    });

    const [areas, setAreas] = useState([]);

    const submit = async (e) => {
        e.preventDefault();

        
        if ( id ) {
            await axios.put(`/api/v1/usuarios/${id}`, data);
        } else {
            await axios.post(`/api/v1/usuarios`, data);
        }

        onReload();
    };

    const onGetItem = async () => {

        const { data } = await axios.get(`/api/v1/usuarios/${id}`);
        const item = { ...data.data }

        setData(
            {
                name: item.name || '-',
                email: item.email,
                documento: item.documento || '-',
                celular: item.celular || '-',
                is_admin: item.is_admin == 'Y' ? true : false,
            }
        )
    }

    useEffect( () => {
        id && onGetItem()
    }, [])

    return (
        <div className="pb-12 pt-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="name" value="Nombre" />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Correo" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                readOnly={ id }
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="celular" value="Celular" />

                            <TextInput
                                id="celular"
                                type="number"
                                name="celular"
                                value={data.celular}
                                className="mt-1 block w-full"
                                autoComplete="celular"
                                onChange={(e) =>
                                    setData("celular", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.celular}
                                className="mt-2"
                            />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="documento" value="Documento" />

                            <TextInput
                                id="documento"
                                type="number"
                                name="documento"
                                value={data.documento}
                                className="mt-1 block w-full"
                                autoComplete="documento"
                                onChange={(e) =>
                                    setData("documento", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.documento}
                                className="mt-2"
                            />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="is_admin" value="Es Administrador?" />

                            <Checkbox
                                id="is_admin"
                                name="is_admin"
                                checked={data.is_admin ? true : false}
                                className="mt-1"
                                autoComplete="is_admin"
                                onChange={(e) => 
                                    setData("is_admin", e.target.checked)
                                }
                            />

                            <InputError
                                message={errors.is_admin}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className="ms-4 mx-4"
                            disabled={processing}
                        >
                            {" "}
                            Guardar{" "}
                        </PrimaryButton>

                        <SecondaryButton
                            type="button"
                            onClick={() => setIsOpen(false)}
                        >
                            {" "}
                            Cancelar{" "}
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
