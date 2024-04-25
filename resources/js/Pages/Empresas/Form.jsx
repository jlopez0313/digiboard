import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import Select from "@/Components/Form/Select";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Form = ({ id, setIsOpen, onReload }) => {

    const [preview, setPreview] = useState([]);

    const { data, setData, processing, errors, reset } = useForm({
        nit: '',
        empresa: '',
        logo: '',
        correo: '',
        celular: '',
    });

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys( data ).forEach( key => {
            formData.append( key, data[key] )
        })

        if ( id ) {
            await axios.put(`/api/v1/empresas/${id}`, formData);
        } else {
            await axios.post(`/api/v1/empresas`, formData);
        }
        onReload();
    };

    const onGetItem = async () => {

        const { data } = await axios.get(`/api/v1/empresas/${id}`);
        const item = { ...data.data }

        setData(
            {                
                nit: item.nit,
                empresa: item.empresa,
                logo: item.logo,
                correo: item.correo,
                celular: item.celular,
            }
        )
    }

    const onAddLogo = async ( file ) => {
        setData(
            {                
                ...data, 
                logo: file,
            }
        )
        
        const preview = URL.createObjectURL( file )
        setPreview(  { src: preview } )
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
                            <InputLabel htmlFor="nit" value="Nit" />

                            <TextInput
                                id="nit"
                                type="number"
                                name="nit"
                                value={data.nit}
                                className="mt-1 block w-full"
                                autoComplete="nit"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("nit", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.nit}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="empresa" value="Empresa" />

                            <TextInput
                                id="empresa"
                                type="text"
                                name="empresa"
                                value={data.empresa}
                                className="mt-1 block w-full"
                                autoComplete="empresa"
                                onChange={(e) =>
                                    setData("empresa", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.empresa}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="correo"
                                value="Correo"
                            />

                            <TextInput
                                id="correo"
                                type="email"
                                name="correo"
                                value={data.correo}
                                className="mt-1 block w-full"
                                autoComplete="correo"
                                onChange={(e) =>
                                    setData("correo", e.target.value)
                                }
                            />


                            <InputError
                                message={errors.correo}
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

                        <div>
                            <InputLabel
                                htmlFor="logo"
                                value="Logo"
                            />

                            <TextInput
                                id="logo"
                                type="file"
                                name="logo"
                                accept='image/*'
                                className="mt-1 block w-full"
                                autoComplete="logo"
                                onChange={e => onAddLogo(e.target.files[0])}
                            />

                            <InputError
                                message={errors.logo}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <img className='media preview' src={preview.src} alt=''/>
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
