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

export const Form = ({ id, departamentos, orientaciones, setIsOpen, onReload }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [ciudades, setCiudades] = useState([]);
    const [areas, setAreas] = useState([]);

    const { data, setData, processing, errors, reset } = useForm({
        deptos_id: "",
        ciudades_id: "",
        areas_id: "",
        pantalla: "",
        orientaciones_id: "",
        code: "",
    });

    const { data: listaDeptos } = departamentos;

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (id) {
                await axios.put(`/api/v1/pantallas/${id}`, data);
            } else {
                await axios.post(`/api/v1/pantallas`, data);
            }
            
            onReload();
        } catch (error) {
            console.log(error);
            notify("error", "Internal Error");
        } finally {
            setIsLoading(false);
        }

    };

    const onGetItem = async () => {
        const { data } = await axios.get(`/api/v1/pantallas/${id}`);
        const item = { ...data.data };

        await onGetCities( item.area?.ciudad?.departamentos_id || 0 );
        await onGetAreas( item.area?.ciudades_id || 0 );

        setData({
            deptos_id: item.area?.ciudad?.departamentos_id || "-",
            ciudades_id: item.area?.ciudades_id || "",
            areas_id: item.area?.id || "-",
            pantalla: item.pantalla,
            orientaciones_id: item.orientaciones_id,
            code: item.code,
        });
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
            setAreas(data.data)
        } else {
            setAreas([])
        }
    }

    useEffect(() => {
        id && onGetItem();
    }, []);

    return (
        <div className="pb-12 pt-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
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
                                onChange={e => setData('areas_id', e.target.value)}
                            >
                                {
                                    areas.map( (area, key) => {
                                        return <option value={ area.id } key={key}> { area.area } </option>
                                    })
                                }
                            </Select>

                            <InputError
                                message={errors.ciudades_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="pantalla" value="Pantalla" />

                            <TextInput
                                id="pantalla"
                                type="text"
                                name="pantalla"
                                value={data.pantalla}
                                className="mt-1 block w-full"
                                autoComplete="pantalla"
                                onChange={(e) =>
                                    setData("pantalla", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.pantalla}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="orientaciones_id"
                                value="Orientación"
                            />

                            <Select
                                id="orientaciones_id"
                                name="orientaciones_id"
                                className="mt-1 block w-full"
                                value={data.orientaciones_id}
                                onChange={(e) =>
                                    setData("orientaciones_id", e.target.value)
                                }
                            >
                                {orientaciones.map((tipo, key) => {
                                    return (
                                        <option value={tipo.key} key={key}>
                                            {" "}
                                            {tipo.valor}{" "}
                                        </option>
                                    );
                                })}
                            </Select>

                            <InputError
                                message={errors.orientaciones_id}
                                className="mt-2"
                            />
                        </div>

                        {id ? (
                            <>
                                <div>
                                    <InputLabel htmlFor="url" value="URL" />

                                    <TextInput
                                        readOnly={true}
                                        type="text"
                                        value={`${window.location.protocol}//${window.location.host}/asignacion/${id}`}
                                        className="mt-1 block w-full"
                                        autoComplete="url"
                                    />
                                </div>
                            </>
                        ) : null}

                        {data.code ? (
                            <div>
                                <InputLabel htmlFor="code" value="Codigo" />

                                <TextInput
                                    readOnly={true}
                                    type="text"
                                    value={data.code}
                                    className="mt-1 block w-full"
                                    autoComplete="code"
                                />
                            </div>
                        ) : null}
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
