import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import TextInput from "@/Components/Form/TextInput";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export const AdminModal = ({ title, show, setIsOpen, onConfirm, url }) => {

    const { data, setData, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = async (e) => {
        e.preventDefault();
        onConfirm( await axios.post(url, data) );
        reset();
    };

    const onReset = () => {
        reset();
        setIsOpen(false)
    }

    return (
        <Modal show={show} closeable={true} title={title}>
            <div className="pb-12 pt-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <InputLabel htmlFor="tipo" value="Código de Acceso" />

                                <TextInput
                                    placeholder="Escriba aquí"
                                    id="tipo"
                                    type="text"
                                    name="tipo"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="tipo"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.tipo}
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
                                Continuar{" "}
                            </PrimaryButton>

                            <SecondaryButton
                                type="button"
                                onClick={() => onReset()}
                            >
                                {" "}
                                Cancelar{" "}
                            </SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}