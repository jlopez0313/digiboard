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
import styles from './Config.module.css';

import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

export const Form = ({ id, cartelera, departamentos, setIsOpen, onReload }) => {

    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, processing, errors, reset } = useForm({
        orientaciones_id: cartelera.orientaciones_id,
        empresas_id: "",
        deptos_id: "",
        ciudades_id: "",
        areas_id: "",
        pantallas_id: [],
        carteleras_id: id,
    });

    const { data: listaDeptos } = departamentos;

    const [ciudades, setCiudades] = useState([]);
    const [areas, setAreas] = useState([]);
    const [pantallas, setPantallas] = useState([]);
    const [myScreens, setMyScreens] = useState(null);
    const [isMulti, setIsMulti] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.put(`/api/v1/carteleras/asignar`, data);
            onReload();
        } catch (e) {
            notify("error", "Error Interno, por favor intente de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    const onGetCiudades = async (depto) => {
        if (depto) {
            if (depto == "ALL") {
                setData("ciudades_id", "ALL");
            } else {
                const { data } = await axios.get(
                    `/api/v1/ciudades/by-departamento/${depto}`
                );
                const lista = [...data.data];

                setData("ciudades_id", "");
                setCiudades(lista);
            }
        } else {
            setData("ciudades_id", "");
            setCiudades([]);
        }
    };

    const onGetAreas = async (ciudad) => {
        if (ciudad) {
            if (ciudad == "ALL") {
                setData("areas_id", "ALL");
            } else {
                const { data } = await axios.get(
                    `/api/v1/areas/by-ciudad/${ciudad}`
                );
                const lista = [...data.data];

                setData("areas_id", "");
                setAreas(lista);
            }
        } else {
            setData("areas_id", "");
            setAreas([]);
        }
    };

    const onGetPantallas = async (area) => {
        if (area) {
            if (area == "ALL") {
                setData("pantallas_id", ["ALL"]);
                setIsMulti(false);
                setMyScreens([{ value: "ALL", label: "TODAS" }]);
                setPantallas([{ value: "ALL", label: "TODAS" }]);
            } else {
                const { data } = await axios.get(
                    `/api/v1/pantallas/area/${area}/orientacion/${cartelera.orientaciones_id}`
                );
                const lista = data.data.map((item) => {
                    return { value: item.id, label: item.pantalla };
                });

                lista.unshift({ value: "ALL", label: "TODAS" });

                setIsMulti(true);

                setMyScreens([]);
                setPantallas(lista);
            }
        } else {
            setMyScreens([]);
            setPantallas([]);
        }
    };

    const onPrepareScreens = (newTags, actionMeta) => {
        
        if (isMulti) {
            const hasAll = newTags.find((tag) => tag.value == "ALL");


            if (hasAll) {
                setIsMulti(false);
                setMyScreens([hasAll]);
                setData("pantallas_id", [hasAll.value]);
            } else {
                const newTagsId = newTags.map((tag) => {
                    return tag.value;
                });

                setMyScreens(
                    newTags.map((tag) => {
                        return { value: tag.value, label: tag.label };
                    })
                );

                setData("pantallas_id", newTagsId);
            }
        } else {
            if (newTags.value !== "ALL") {
                setIsMulti(true);
                setMyScreens([newTags]);
                setData("pantallas_id", [newTags.value]);
            }
        }
    };

    useEffect(() => {
        onGetCiudades(data.deptos_id);
    }, [data.deptos_id]);

    useEffect(() => {
        onGetAreas(data.ciudades_id);
    }, [data.ciudades_id]);

    useEffect(() => {
        onGetPantallas(data.areas_id);
    }, [data.areas_id]);

    return (
        <div className="pb-12 pt-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel
                                htmlFor="deptos_id"
                                value="Departamento"
                            />

                            <Select
                                id="deptos_id"
                                name="deptos_id"
                                className="mt-1 block w-full"
                                value={data.deptos_id}
                                onChange={(e) =>
                                    setData("deptos_id", e.target.value)
                                }
                            >
                                <option value="ALL"> TODOS </option>
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
                                message={errors.deptos_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="ciudades_id" value="Ciudad" />

                            <Select
                                id="ciudades_id"
                                name="ciudades_id"
                                className="mt-1 block w-full"
                                value={data.ciudades_id}
                                onChange={(e) =>
                                    setData("ciudades_id", e.target.value)
                                }
                            >
                                <option value="ALL"> TODAS </option>
                                {ciudades.map((tipo, key) => {
                                    return (
                                        <option value={tipo.id} key={key}>
                                            {" "}
                                            {tipo.ciudad}{" "}
                                        </option>
                                    );
                                })}
                            </Select>

                            <InputError
                                message={errors.ciudades_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="areas_id" value="Area" />

                            <Select
                                id="areas_id"
                                name="areas_id"
                                className="mt-1 block w-full"
                                value={data.areas_id}
                                onChange={(e) =>
                                    setData("areas_id", e.target.value)
                                }
                            >
                                <option value="ALL"> TODAS </option>

                                {areas.map((tipo, key) => {
                                    return (
                                        <option value={tipo.id} key={key}>
                                            {" "}
                                            {tipo.area}{" "}
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
                                htmlFor="pantallas_id"
                                value="Pantalla"
                            />

                            <ReactSelect
                                isMulti={isMulti}
                                id="pantallas_id"
                                name="pantallas_id"
                                className={`mt-1 block w-full ${styles['select']}`}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                options={pantallas}
                                value={myScreens}
                                onChange={onPrepareScreens}
                            />

                            <InputError
                                message={errors.pantallas_id}
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
