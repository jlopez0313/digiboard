import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TextArea from "@/Components/Form/TextArea";
import Icon from "@/Components/Icon";

export const Form = ({ id, setIsOpen, onReload }) => {

    const [previews, setPreviews] = useState([]);

    const { data, setData, processing, errors, reset } = useForm({
        disenos_id: 1,
        marquesina: '',
        fecha_inicial: '',
        fecha_final: '',
        multimedias: [],
    });

    const submit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        Object.keys( data ).forEach( key => {
            if ( key === 'multimedias' ) {
                for (const file of data[key]) {
                    formData.append('multimedias[]', file) // appending every file to formdata
                }
            } else {
                formData.append( key, data[key] )
            }
        })
        
        if ( id ) {
            formData.append('_method', 'PUT')
            await axios.post(`/api/v1/carteleras/${id}`, formData);
        } else {
            await axios.post(`/api/v1/carteleras`, formData);
        }

        onReload();
    };

    const onGetItem = async () => {

        const { data } = await axios.get(`/api/v1/carteleras/${id}`);
        const item = { ...data.data }

        setData(
            {                
                disenos_id: item.diseno?.id,
                marquesina: item.marquesina,
                fecha_inicial: item.fecha_inicial,
                fecha_final: item.fecha_final,
                multimedias: []
            }
        )

        setPreviews( item.multimedias )
    }

    const onGetAreas = async ( empresa ) => {
        if ( empresa ) {
            const { data } = await axios.get(`/api/v1/areas/empresa/${empresa}`);
            const lista = [ ...data.data ]
    
            setAreas( lista )
        } else {
            setAreas( [] )
        }
    }

    const onGetPantallas = async ( area ) => {
        if ( area ) {
            const { data } = await axios.get(`/api/v1/pantallas/area/${area}`);
            const lista = [ ...data.data ]
    
            setPantallas( lista )
        } else {
            setPantallas( [] )
        }
    }

    const onAddFiles = async ( evt ) => {
        const files = await Array.from( evt.target.files )

        setData(
            {                
                ...data, 
                multimedias: [...data.multimedias, ...files ],
            }
        )
        
        Object.keys(files).forEach( key => {
            const preview = URL.createObjectURL( files[key] )
            setPreviews( list => [
                ...list, 
                { src: preview, mimetype: files[key].type } 
            ])
      
        })

    }

    const onRemoveMedia = async ( key, id ) => {
        const files = [...data.multimedias]
        files.splice(key, 1)
        setData(
            {                
                ...data, 
                multimedias: [...files],
            }
        )
    
        const prevs = [...previews]
        const prev = prevs.splice(key, 1)
        setPreviews([...prevs])

        if ( id ) {
            const { data: file  } = await axios.delete(`/api/v1/multimedias/${id}`);
        }
    }

    useEffect( () => {
        id && onGetItem()
    }, [])
    
    useEffect( () => {
        data.empresas_id && onGetAreas( data.empresas_id )
    }, [data.empresas_id])
    
    useEffect( () => {
        data.areas_id && onGetPantallas( data.areas_id )
    }, [data.areas_id])

    return (
        <div className="pb-12 pt-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <InputLabel htmlFor="fecha_inicial" value="Fecha inicial" />

                            <TextInput
                                id="fecha_inicial"
                                name="fecha_inicial"
                                type='date'
                                value={data.fecha_inicial}
                                className="mt-1 block w-full"
                                autoComplete="fecha_inicial"
                                onChange={(e) =>
                                    setData("fecha_inicial", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.fecha_inicial}
                                className="mt-2"
                            />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="fecha_final" value="Fecha final" />

                            <TextInput
                                id="fecha_final"
                                name="fecha_final"
                                type='date'
                                value={data.fecha_final}
                                min={data.fecha_inicial}
                                className="mt-1 block w-full"
                                autoComplete="fecha_final"
                                onChange={(e) =>
                                    setData("fecha_final", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.fecha_final}
                                className="mt-2"
                            />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="fecha_final" value="Fecha final" />

                            <TextInput
                                accept="image/*, video/*"
                                multiple
                                id="arhcivos"
                                name="arhcivos"
                                type='file'
                                value={data.arhcivos}
                                min={data.arhcivos}
                                className="mt-1 block w-full"
                                autoComplete="arhcivos"
                                onChange={onAddFiles}
                            />

                            <InputError
                                message={errors.arhcivos}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="marquesina" value="Marquesina" />

                            <TextArea
                                id="marquesina"
                                name="marquesina"
                                value={data.marquesina}
                                className="mt-1 block w-full"
                                autoComplete="marquesina"
                                onChange={(e) =>
                                    setData("marquesina", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.marquesina}
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

                <div className="grid grid-cols-4 gap-4 mt-2">
                    {
                        previews.map( (media, key) => {
                            return <div className='grid-item border rounded shadow p-2' key={key}>
                                <Icon
                                    name="trash"
                                    className="cursor-pointer h-4 text-red-400 fill-current"
                                    onClick={ () => onRemoveMedia( key, media.id ) }
                                />
                                {
                                    media.mimetype.includes('image') ? 
                                    <img className='media preview' src={media.src} alt=''/>
                                    : 
                                    <video className='media preview' alt='' controls>
                                        <source src={media.src}></source>
                                    </video>
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
};
