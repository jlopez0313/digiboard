import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import axios from "axios";
import Select from "@/Components/Form/Select";

export const Form = ({ id, departamentos, setIsOpen, onReload }) => {

    const { data, setData, processing, errors, reset } = useForm({
        departamentos_id: '',
        ciudad: '',
    });

    const submit = async (e) => {
        e.preventDefault();

        
        if ( id ) {
            await axios.put(`/api/v1/ciudades/${id}`, data);
        } else {
            await axios.post(`/api/v1/ciudades`, data);
        }

        onReload();
    };

    const onGetItem = async () => {

        const { data } = await axios.get(`/api/v1/ciudades/${id}`);
        const item = { ...data.data }

        setData(
            {                
                departamentos_id: item.departamento?.id || '-',
                ciudad: item.ciudad,
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
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <InputLabel htmlFor="departamentos_id" value="Departamento" />

                            <Select
                                id="departamentos_id"
                                name="departamentos_id"
                                className="mt-1 block w-full"
                                value={data.departamentos_id}
                                onChange={(e) =>
                                    setData("departamentos_id", e.target.value)
                                }
                            >
                                {
                                    departamentos.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.departamento } </option>
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
                                htmlFor="ciudad"
                                value="Ciudad"
                            />

                            <TextInput
                                id="ciudad"
                                type="text"
                                name="ciudad"
                                value={data.ciudad}
                                className="mt-1 block w-full"
                                autoComplete="ciudad"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("ciudad", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.ciudad}
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
