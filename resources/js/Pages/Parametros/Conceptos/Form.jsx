import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import axios from "axios";

export const Form = ({ id, setIsOpen, onReload }) => {

    const { data, setData, processing, errors, reset } = useForm({
        concepto: '',
    });

    const submit = async (e) => {
        e.preventDefault();

        
        if ( id ) {
            await axios.put(`/api/v1/conceptos/${id}`, data);
        } else {
            await axios.post(`/api/v1/conceptos`, data);
        }

        onReload();
    };

    const onGetItem = async () => {

        const { data } = await axios.get(`/api/v1/conceptos/${id}`);
        const item = { ...data.data }

        setData(
            {                
                concepto: item.concepto,
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
                            <InputLabel htmlFor="concepto" value="Concepto" />

                            <TextInput
                                id="concepto"
                                type="text"
                                name="concepto"
                                value={data.concepto}
                                className="mt-1 block w-full"
                                autoComplete="concepto"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("concepto", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.concepto}
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
