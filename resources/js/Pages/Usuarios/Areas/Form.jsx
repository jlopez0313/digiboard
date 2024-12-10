import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "@/Components/Form/Select";
import { notify } from "@/Helpers/Notify";

export const Form = ({ id, usuario, departamentos, old_areas, setIsOpen, onReload }) => {

    const [isLoading, setIsLoading] = useState( false );
    const [ciudades, setCiudades] = useState([]);
    const [areas, setAreas] = useState([]);
    
    const { data, setData, processing, errors, reset } = useForm({
        deptos_id: "",
        ciudades_id: "",
        usuarios_id: id,
        areas_id: '',
    });

    const { data: listaDeptos } = departamentos;

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.put(`/api/v1/usuarios/asignar`, data);
            onReload();
        } catch (error) {
            console.log( error )
            notify( 'error', 'Internal Error' )
        } finally {
            setIsLoading(false);
        }
    };

    
    const onGetCities = async (deptoID) => {
        if ( deptoID ) {
            setData("deptos_id", deptoID)
            
            const {data} = await axios.get(`/api/v1/ciudades/by-departamento/${deptoID}`);
            
            setCiudades(data.data)
        } else {
            setCiudades([])
        }
    }

    const onGetAreas = async (ciudadID) => {
        if ( ciudadID ) {
            setData("ciudades_id", ciudadID)

            const {data} = await axios.get(`/api/v1/areas/by-ciudad/${ciudadID}`);

            const _areas = data.data.filter( item => !old_areas.find( old => old.area.id == item.id ) )

            setAreas(_areas)
        } else {
            setAreas([])
        }
    }

    return (
        <div className="pb-12 pt-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel
                                htmlFor="usuarios_id"
                                value="Usuario"
                            />

                            <TextInput
                                value={usuario}
                                className="mt-1 block w-full"
                                autoComplete="id"
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="deptos_id" value="Departamento" />

                            <Select
                                id="deptos_id"
                                name="deptos_id"
                                className="mt-1 block w-full"
                                value={data.deptos_id}
                                onChange={e => onGetCities(e.target.value)}
                            >
                                {listaDeptos.map((tipo, key) => {
                                    return (
                                        <option value={tipo.id} key={key}>
                                            {" "}
                                            {tipo.departamento}{" "}
                                        </option>
                                    );
                                })}
                            </Select>

                            <InputError
                                message={errors.areas_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="ciudades_id"
                                value="Ciudad"
                            />

                            <Select
                                id="ciudades_id"
                                name="ciudades_id"
                                className="mt-1 block w-full"
                                value={data.ciudades_id}
                                onChange={e => onGetAreas(e.target.value)}
                            >
                                {
                                    ciudades.map( (ciudad, key) => {
                                        return <option value={ ciudad.id } key={key}> { ciudad.ciudad } </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.ciudades_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="areas_id"
                                value="Area"
                            />

                            <Select
                                id="areas_id"
                                name="areas_id"
                                className="mt-1 block w-full"
                                value={data.areas_id}
                                onChange={(e) =>
                                    setData("areas_id", e.target.value)
                                }
                            >
                                {
                                    areas.map( (tipo, key) => {
                                        return <option value={ tipo.id } key={key}> { tipo.area} </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.empresas_id}
                                className="mt-2"
                            />
                        </div>

                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className="ms-4 mx-4"
                            disabled={isLoading}
                        >
                            {isLoading ? "Guardando..." : "Guardar"}
                        </PrimaryButton>

                        <SecondaryButton
                            type="button"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
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
