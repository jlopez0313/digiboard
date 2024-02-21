import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import Select from "@/Components/Form/Select";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Icon from "@/Components/Icon";

export const Form = ({ id, factura, setIsOpen, onReload }) => {

    const { data, setData, processing, errors, reset } = useForm({
        facturas_id: factura.id, 
        valor: '',
        descripcion: '',
    });

    const [producto, setProducto] = useState({});

    const submit = async (e) => {
        e.preventDefault();

        if ( id ) {
            await axios.put(`/api/v1/recaudos/${id}`, data);
        } else {
            await axios.post(`/api/v1/recaudos`, data);
        }
        onReload();
    };

    const onCheckCantidad = (e) => {
        if (e.target.value > producto.cantidad)  {
            alert('cantidad no disonible')
        } else {
            setData("cantidad", e.target.value);
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
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="valor" value="Valor" />

                            <TextInput
                                id="valor"
                                type="number"
                                name="valor"
                                value={data.valor}
                                className="mt-1 block w-full col-start-1 col-span-10"
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

                        <div>
                            <InputLabel htmlFor="descripcion" value="Descripción" />

                            <TextInput
                                id="descripcion"
                                type="text"
                                name="descripcion"
                                value={data.descripcion}
                                className="mt-1 block w-full col-start-1 col-span-10"
                                autoComplete="valor"
                                onChange={(e) =>
                                    setData("descripcion", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.descripcion}
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
                        id="facturas_id"
                        type="hidden"
                        name="facturas_id"
                        value={factura.id}
                        className="mt-1 block w-full"
                        autoComplete="facturas_id"
                        onChange={(e) =>
                            setData("facturas_id", e.target.value)
                        }
                    />
                </form>
            </div>
        </div>
    );
};
