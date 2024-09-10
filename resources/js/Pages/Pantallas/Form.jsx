import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "@/Components/Form/Select";

export const Form = ({ id, areas, setIsOpen, onReload }) => {

    const { data, setData, processing, errors, reset } = useForm({
        areas_id: '',
        pantalla: '',
        code: '',
    });

    const {data: listaAreas} = areas

    const submit = async (e) => {
        e.preventDefault();

        
        if ( id ) {
            await axios.put(`/api/v1/pantallas/${id}`, data);
        } else {
            await axios.post(`/api/v1/pantallas`, data);
        }

        onReload();
    };

    const onGetItem = async () => {

        const { data } = await axios.get(`/api/v1/pantallas/${id}`);
        const item = { ...data.data }

        setData(
            {
                areas_id: item.area?.id || '',
                pantalla: item.pantalla,
                code: item.code,
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
                            <InputLabel
                                htmlFor="areas_id"
                                value="Area"
                            />

                            <Select
                                id="areas_id"
                                name="areas_id"
                                className="mt-1 block w-full"
                                value={data.areas_id}
                                onChange={(e) =>
                                    setData("areas_id", e.target.value)
                                }
                            >
                                {                                    
                                    listaAreas.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.area} </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.areas_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="pantalla" value="Pantalla" />

                            <TextInput
                                id="pantalla"
                                type="text"
                                name="pantalla"
                                value={data.pantalla}
                                className="mt-1 block w-full"
                                autoComplete="pantalla"
                                onChange={(e) =>
                                    setData("pantalla", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.pantalla}
                                className="mt-2"
                            />
                        </div>
                        
                        {
                            id ?
                            <>
                                <div>
                                    <InputLabel htmlFor="url" value="URL" />

                                    <TextInput
                                        readOnly={true}
                                        type="text"
                                        value={`${window.location.protocol}//${window.location.host}/asignacion/${id}`}
                                        className="mt-1 block w-full"
                                        autoComplete="url"
                                    />
                                </div>
                            </> : null
                        }

                        {
                            data.code ?
                                <div>
                                    <InputLabel htmlFor="code" value="Codigo" />

                                    <TextInput
                                        readOnly={true}
                                        type="text"
                                        value={data.code}
                                        className="mt-1 block w-full"
                                        autoComplete="code"
                                    />
                                </div>
                            : null
                        }


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
