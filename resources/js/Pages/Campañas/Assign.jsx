import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "@/Components/Form/Select";

export const Assign = ({ id, empresas, setIsOpen, onReload }) => {

    const { data, setData, processing, errors, reset } = useForm({
        empresas_id: '',
        areas_id: '',
        pantallas_id: '',
        carteleras_id: id,
    });

    const {
        data: listaEmpresas,
    } = empresas;

    const [areas, setAreas] = useState([]);
    const [pantallas, setPantallas] = useState([]);

    const submit = async (e) => {
        e.preventDefault();

        await axios.put(`/api/v1/carteleras/asignar`, data);
        onReload();
    };

    const onGetAreas = async ( empresa ) => {
        if ( empresa ) {
            const { data } = await axios.get(`/api/v1/areas/empresa/${empresa}`);
            const lista = [ ...data.data ]
    
            setAreas( lista )
        } else {
            setAreas( [] )
        }
    }

    const onGetPantallas = async ( area ) => {
        if ( area ) {
            const { data } = await axios.get(`/api/v1/pantallas/area/${area}`);
            const lista = [ ...data.data ]
    
            setPantallas( lista )
        } else {
            setPantallas( [] )
        }
    }

    useEffect( () => {
        onGetAreas( data.empresas_id )
    }, [data.empresas_id])

    useEffect( () => {
        onGetPantallas( data.areas_id )
    }, [data.areas_id])

    return (
        <div className="pb-12 pt-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel
                                htmlFor="empresas_id"
                                value="Empresa"
                            />

                            <Select
                                id="empresas_id"
                                name="empresas_id"
                                className="mt-1 block w-full"
                                value={data.empresas_id}
                                onChange={(e) =>
                                    setData("empresas_id", e.target.value)
                                }
                            >
                                {
                                    listaEmpresas.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.empresa} </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.empresas_id}
                                className="mt-2"
                            />
                        </div>

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
                                    areas.map( (tipo, key) => {
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
                            <InputLabel
                                htmlFor="pantallas_id"
                                value="Pantalla"
                            />

                            <Select
                                id="pantallas_id"
                                name="pantallas_id"
                                className="mt-1 block w-full"
                                value={data.pantallas_id}
                                onChange={(e) =>
                                    setData("pantallas_id", e.target.value)
                                }
                            >
                                {                                    
                                    pantallas.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.pantalla} </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.pantallas_id}
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
