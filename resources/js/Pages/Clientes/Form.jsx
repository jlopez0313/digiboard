import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import Select from "@/Components/Form/Select";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Form = ({ id, tipoClientes, departamentos, setIsOpen, onReload }) => {

    const [ciudades, setCiudades] = useState([]);


    const { data, setData, processing, errors, reset } = useForm({
        documento: '',
        nombre: '',
        tipo: '',
        depto: '',
        ciudad: '',
        direccion: '',
        celular: '',
    });

    const {
        data: tipos,
    } = tipoClientes;

    const {
        data: deptos,
    } = departamentos;

    const submit = async (e) => {
        e.preventDefault();

        if ( id ) {
            await axios.put(`/api/v1/clientes/${id}`, data);
        } else {
            await axios.post(`/api/v1/clientes`, data);
        }
        onReload();
    };

    const onGetItem = async () => {

        const { data } = await axios.get(`/api/v1/clientes/${id}`);
        const item = { ...data.data }

        await onGetCities( item.ciudad.departamento.id );

        setData(
            {                
                documento: item.documento,
                nombre: item.nombre,
                tipo: item.tipo.id,
                depto: item.ciudad.departamento.id,
                ciudad: item.ciudad.id,
                direccion: item.direccion,
                celular: item.celular,
            }
        )
    }

    const onGetCities = async (deptoID) => {
        if ( deptoID ) {
            const {data} = await axios.get(`/api/v1/ciudades/${deptoID}`);
            
            setData("depto", deptoID)
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
                            <InputLabel htmlFor="documento" value="Documento" />

                            <TextInput
                                id="documento"
                                type="number"
                                name="documento"
                                value={data.documento}
                                className="mt-1 block w-full"
                                autoComplete="documento"
                                isFocused={true}
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
                            <InputLabel htmlFor="nombre" value="Nombre" />

                            <TextInput
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={data.nombre}
                                className="mt-1 block w-full"
                                autoComplete="nombre"
                                onChange={(e) =>
                                    setData("nombre", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.nombre}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="tipo"
                                value="Tipo de Cliente"
                            />

                            <Select
                                id="tipo"
                                name="tipo"
                                className="mt-1 block w-full"
                                value={data.tipo}
                                onChange={(e) =>
                                    setData("tipo", e.target.value)
                                }
                            >
                                {
                                    tipos.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.tipo} </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.tipo}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="departamento"
                                value="Departamento"
                            />

                            <Select
                                id="departamento"
                                name="departamento"
                                className="mt-1 block w-full"
                                value={data.depto}
                                onChange={e => onGetCities(e.target.value)}
                            >
                                {
                                    deptos.map( (depto, key) => {
                                        return <option value={ depto.id } key={key}> { depto.departamento} </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.departamento}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="ciudad" value="Ciudad" />

                            <Select
                                id="ciudad"
                                name="ciudad"
                                className="mt-1 block w-full"
                                value={data.ciudad}
                                onChange={(e) =>
                                    setData("ciudad", e.target.value)
                                }
                            >
                                {
                                    ciudades.map( (ciudad, key) => {
                                        return <option value={ ciudad.id } key={key}> { ciudad.ciudad } </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.ciudad}
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
