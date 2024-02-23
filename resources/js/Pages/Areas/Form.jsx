import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "@/Components/Form/Select";

export const Form = ({ id, empresas, departamentos, setIsOpen, onReload }) => {

    const [ciudades, setCiudades] = useState([]);

    const { data, setData, processing, errors, reset } = useForm({
        departamentos_id: '',
        ciudades_id: '',
        empresas_id: '',
        direccion: '',
        area: '',
    });

    const {
        data: listaEmpresas
    } = empresas
    
    const {
        data: listaDepartamentos
    } = departamentos

    const submit = async (e) => {
        e.preventDefault();

        
        if ( id ) {
            await axios.put(`/api/v1/areas/${id}`, data);
        } else {
            await axios.post(`/api/v1/areas`, data);
        }

        onReload();
    };

    const onGetItem = async () => {

        const { data } = await axios.get(`/api/v1/areas/${id}`);
        const item = { ...data.data }

        await onGetCities( item.ciudad.departamentos_id );

        setData(
            {
                departamentos_id: item.ciudad.departamentos_id,
                ciudades_id: item.ciudad.id,
                empresas_id: item.empresa.id,
                direccion: item.direccion,
                area: item.area,
            }
        )
    }

    const onGetCities = async (deptoID) => {
        if ( deptoID ) {
            const {data} = await axios.get(`/api/v1/ciudades/by-departamento/${deptoID}`);
            
            setData("departamentos_id", deptoID)
            setCiudades(data.data)
        } else {
            setCiudades([])
        }
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
                                htmlFor="ciudades_id"
                                value="Departamento"
                            />

                            <Select
                                id="departamentos_id"
                                name="departamentos_id"
                                className="mt-1 block w-full"
                                value={data.departamentos_id}
                                onChange={e => onGetCities(e.target.value)}
                            >
                                {
                                    listaDepartamentos.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.departamento} </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.departamentos_id}
                                className="mt-2"
                            />
                        </div>
                        
                        <div>
                            <InputLabel
                                htmlFor="ciudades_id"
                                value="Ciudad"
                            />

                            <Select
                                id="ciudades_id"
                                name="ciudades_id"
                                className="mt-1 block w-full"
                                value={data.ciudades_id}
                                onChange={(e) =>
                                    setData("ciudades_id", e.target.value)
                                }
                            >
                                {
                                    ciudades.map( (ciudad, key) => {
                                        return <option value={ ciudad.id } key={key}> { ciudad.ciudad } </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.ciudades_id}
                                className="mt-2"
                            />
                        </div>
                        
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
                            <InputLabel htmlFor="area" value="Area" />

                            <TextInput
                                id="area"
                                type="text"
                                name="area"
                                value={data.area}
                                className="mt-1 block w-full"
                                autoComplete="area"
                                onChange={(e) =>
                                    setData("area", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.area}
                                className="mt-2"
                            />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="direccion" value="Dirección" />

                            <TextInput
                                id="direccion"
                                type="text"
                                name="direccion"
                                value={data.direccion}
                                className="mt-1 block w-full"
                                autoComplete="direccion"
                                onChange={(e) =>
                                    setData("direccion", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.direccion}
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
