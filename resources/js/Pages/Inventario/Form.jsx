import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import Select from "@/Components/Form/Select";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Form = ({ id, origenes, setIsOpen, onReload }) => {

    const [ciudades, setCiudades] = useState([]);


    const { data, setData, processing, errors, reset } = useForm({
        articulo: '',
        origen: '',
    });

    const submit = async (e) => {
        e.preventDefault();

        if ( id ) {
            await axios.put(`/api/v1/inventarios/${id}`, data);
        } else {
            await axios.post(`/api/v1/inventarios`, data);
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

    useEffect( () => {
        id && onGetItem()
    }, [])

    return (
        <div className="pb-12 pt-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="articulo" value="Artículo" />

                            <TextInput
                                id="articulo"
                                type="text"
                                name="articulo"
                                value={data.articulo}
                                className="mt-1 block w-full"
                                autoComplete="articulo"
                                onChange={(e) =>
                                    setData("articulo", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.articulo}
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
