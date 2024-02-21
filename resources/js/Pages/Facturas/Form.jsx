import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import Select from "@/Components/Form/Select";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Form = ({ id, payments, tipoClientes, departamentos, setIsOpen, onReload }) => {

    const [ciudades, setCiudades] = useState([]);

    const {
        data: tipos,
    } = tipoClientes;


    const { data, setData, processing, errors, reset } = useForm({
        clientes_id: '',
        documento: '',
        nombre: '',
        departamento: '',
        ciudad: '',
        direccion: '',
        celular: '',
        tipo: '',
        tipo_pago: '',
    });

    const submit = async (e) => {
        e.preventDefault();

        if ( id ) {
            await axios.put(`/api/v1/facturas/${id}`, data);
        } else {
            await axios.post(`/api/v1/facturas`, data);
        }
        onReload();
    };

    const onGetItem = async () => {

        const { data } = await axios.get(`/api/v1/inventarios/${id}`);
        const item = { ...data.data }

        setData(
            {                
                articulo: item.articulo,
                origen: item.origen,
            }
        )
    }

    const onCheckDoc = ( doc ) => {
        if (!doc ) {
            reset();
        } else {
            setData("documento", doc)
        }
    }

    const onSearchCliente = async () => {
        if ( data.documento ) {
            const { data: {data: cliente} } = await axios.post(`/api/v1/clientes/by-document/${data.documento}`);
            
            if ( cliente ) {
                await onGetCities( cliente.ciudad.departamento.id );
    
                setData(
                    {
                        ...data,
                        clientes_id: cliente.id,
                        nombre: cliente.nombre,
                        departamento: cliente.ciudad.departamento.id,
                        ciudad: cliente.ciudad.id,
                        direccion: cliente.direccion,
                        celular: cliente.celular,
                        tipo: cliente.tipo.id,
                    }
                )
            } else {
                reset()
            }
        } else {
            reset()
        }
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
                                type="text"
                                name="documento"
                                value={data.documento}
                                className="mt-1 block w-full"
                                autoComplete="documento"
                                onChange={(e) =>
                                    onCheckDoc( e.target.value )
                                }
                                onBlur={onSearchCliente}
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
                            <InputLabel htmlFor="departamento" value="Departamento" />

                            <Select
                                id="departamento"
                                name="departamento"
                                className="mt-1 block w-full"
                                value={data.departamento}
                                onChange={(e) =>
                                    onGetCities(e.target.value)
                                }
                            >
                                {
                                    departamentos.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.departamento } </option>
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
                                    ciudades.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.ciudad } </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.ciudad}
                                className="mt-2"
                            />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="articulo" value="Dirección" />

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
                                type="text"
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
                            <InputLabel htmlFor="tipo_id" value="Tipo" />

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
                                message={errors.tipo_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="tipo_pago"
                                value="Forma de Pago"
                            />

                            <Select
                                id="tipo_pago"
                                name="tipo_pago"
                                className="mt-1 block w-full"
                                value={data.tipo_pago}
                                onChange={(e) =>
                                    setData("tipo_pago", e.target.value)
                                }
                            >
                                {
                                    payments.map( (tipo, key) => {
                                        return <option value={ tipo.key } key={key}> { tipo.valor } </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.tipo_pago}
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

                    <TextInput
                        id="clientes_id"
                        type="hidden"
                        name="clientes_id"
                        value={data.clientes_id}
                        className="mt-1 block w-full"
                        autoComplete="clientes_id"
                        onChange={(e) =>
                            setData("clientes_id", e.target.value)
                        }
                    />

                </form>
            </div>
        </div>
    );
};
