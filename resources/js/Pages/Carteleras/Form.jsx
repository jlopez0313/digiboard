import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import axios from "axios";
import Select from "@/Components/Form/Select";

export const Form = ({ id, clientes, conceptos, origenes, setIsOpen, onReload }) => {

    const { data, setData, processing, errors, reset } = useForm({
        clientes_id: '',
        conceptos_id: '',
        valor: '',
        origen: '',
    });

    const {
        data: listaClientes,
    } = clientes;

    const {
        data: listaConceptos,
    } = conceptos;

    const submit = async (e) => {
        e.preventDefault();

        
        if ( id ) {
            await axios.put(`/api/v1/gastos/${id}`, data);
        } else {
            await axios.post(`/api/v1/gastos`, data);
        }

        onReload();
    };

    const onGetItem = async () => {

        const { data } = await axios.get(`/api/v1/gastos/${id}`);
        const item = { ...data.data }

        setData(
            {                
                color: item.color,
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
                                htmlFor="clientes_id"
                                value="Cliente"
                            />

                            <Select
                                id="clientes_id"
                                name="clientes_id"
                                className="mt-1 block w-full"
                                value={data.clientes_id}
                                onChange={(e) =>
                                    setData("clientes_id", e.target.value)
                                }
                            >
                                {
                                    listaClientes.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.nombre} </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.clientes_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="conceptos_id"
                                value="Concepto"
                            />

                            <Select
                                id="conceptos_id"
                                name="conceptos_id"
                                className="mt-1 block w-full"
                                value={data.conceptos_id}
                                onChange={(e) =>
                                    setData("conceptos_id", e.target.value)
                                }
                            >
                                {                                    
                                    listaConceptos.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.concepto} </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.conceptos_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="origen"
                                value="Origen"
                            />

                            <Select
                                id="origen"
                                name="origen"
                                className="mt-1 block w-full"
                                value={data.origen}
                                onChange={(e) =>
                                    setData("origen", e.target.value)
                                }
                            >
                                {
                                    origenes.map( (tipo, key) => {
                                        return <option value={ tipo.key } key={key}> { tipo.valor } </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.origen}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="valor" value="Valor" />

                            <TextInput
                                id="valor"
                                type="number"
                                name="valor"
                                value={data.valor}
                                className="mt-1 block w-full"
                                autoComplete="valor"
                                onChange={(e) =>
                                    setData("valor", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.valor}
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
