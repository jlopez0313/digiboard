import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import Select from "@/Components/Form/Select";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Form = ({ id, inventario, colores, medidas, setIsOpen, onReload }) => {

    const { data, setData, processing, errors, reset } = useForm({
        inventarios_id: inventario.id, 
        referencia: '',
        colores_id: '',
        medidas_id: '',
        cantidad: '',
        precio: '',
    });

    const submit = async (e) => {
        e.preventDefault();

        if ( id ) {
            await axios.put(`/api/v1/productos/${id}`, data);
        } else {
            await axios.post(`/api/v1/productos`, data);
        }
        onReload();
    };

    const onGetItem = async () => {

        const { data } = await axios.get(`/api/v1/productos/${id}`);
        const item = { ...data.data }

        setData(
            {                
                inventarios_id: inventario.id, 
                referencia: item.referencia,
                medidas_id: item.medida.id,
                colores_id: item.color.id,
                cantidad: item.cantidad,
                precio: item.precio,
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
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel
                                htmlFor="medidas_id"
                                value="Medida"
                            />

                            <Select
                                id="medidas_id"
                                name="medidas_id"
                                className="mt-1 block w-full"
                                value={data.medidas_id}
                                onChange={(e) =>
                                    setData("medidas_id", e.target.value)
                                }
                            >
                                {
                                    medidas.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.medida } </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.medidas_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="colores_id"
                                value="Color"
                            />

                            <Select
                                id="colores_id"
                                name="colores_id"
                                className="mt-1 block w-full"
                                value={data.colores_id}
                                onChange={(e) =>
                                    setData("colores_id", e.target.value)
                                }
                            >
                                {
                                    colores.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.color } </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.colores_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="referencia" value="Referencia" />

                            <TextInput
                                id="referencia"
                                type="number"
                                name="referencia"
                                value={data.referencia}
                                className="mt-1 block w-full"
                                autoComplete="referencia"
                                onChange={(e) =>
                                    setData("referencia", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.referencia}
                                className="mt-2"
                            />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="cantidad" value="Cantidad" />

                            <TextInput
                                id="cantidad"
                                type="number"
                                name="cantidad"
                                value={data.cantidad}
                                className="mt-1 block w-full"
                                autoComplete="cantidad"
                                onChange={(e) =>
                                    setData("cantidad", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.cantidad}
                                className="mt-2"
                            />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="precio" value="Precio de Costo" />

                            <TextInput
                                id="precio"
                                type="number"
                                name="precio"
                                value={data.precio}
                                className="mt-1 block w-full"
                                autoComplete="precio"
                                onChange={(e) =>
                                    setData("precio", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.precio}
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
                        id="inventarios_id"
                        type="hidden"
                        name="inventarios_id"
                        value={inventario.id}
                        className="mt-1 block w-full"
                        autoComplete="inventarios_id"
                        onChange={(e) =>
                            setData("inventarios_id", e.target.value)
                        }
                    />
                </form>
            </div>
        </div>
    );
};
