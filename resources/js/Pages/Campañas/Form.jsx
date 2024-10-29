import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import TextArea from "@/Components/Form/TextArea";
import Icon from "@/Components/Icons/Index";
import Select from "@/Components/Form/Select";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { notify } from "@/Helpers/Notify";
const animatedComponents = makeAnimated();

export default ({
    auth,
    id,
    orientaciones,
    usuarios,
    departamentos,
    tipos_respuesta,
}) => {
    const [previews, setPreviews] = useState([]);
    const [pantallas, setPantallas] = useState([]);
    const [myScreens, setMyScreens] = useState(null);
    const [isMulti, setIsMulti] = useState(false);

    const [ciudades, setCiudades] = useState([]);
    const [areas, setAreas] = useState([]);

    const filesRef = useRef(null);

    const { data: users } = usuarios;

    const { data: listaDeptos } = departamentos;

    const { data, setData, processing, errors, reset } = useForm({
        orientaciones_id: "",
        nombre: "",
        pantallas_id: [],
        eje: "",
        objetivo: "",
        impacto: "",
        pregunta: "",

        logro_esperado: "",
        evaluador_id: "",
        descripcion_kpi: "",

        valor_min_malo: "",
        valor_max_malo: "",
        valor_min_regular: "",
        valor_max_regular: "",
        valor_min_bueno: "",
        valor_max_bueno: "",

        encuesta: "",
        tipo_respuesta_id: "",

        disenos_id: 1,
        marquesina: "",
        fecha_inicial: "",
        fecha_final: "",
        multimedias: [],
    });

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "multimedias") {
                for (const file of data[key]) {
                    formData.append("multimedias[]", file); // appending every file to formdata
                }
            } else if (key === "pantallas_id") {
                for (const file of data[key]) {
                    formData.append("pantallas_id[]", file); // appending every file to formdata
                }
            } else {
                formData.append(key, data[key]);
            }
        });

        if (id) {
            formData.append("_method", "PUT");
            await axios.post(`/api/v1/campanas/${id}`, formData);
        } else {
            await axios.post(`/api/v1/campanas`, formData);
        }

        onReload();
    };

    const onGetItem = async () => {
        const { data } = await axios.get(`/api/v1/campanas/${id}`);
        const item = { ...data.data };

        setData({
            nombre: item.nombre,
            pantallas: item.cartelera?.pantallas?.map((x) => x.id),
            eje: item.eje,
            objetivo: item.objetivo,
            impacto: item.impacto,
            pregunta: item.pregunta,

            logro_esperado: item.logro_esperado,
            evaluador_id: item.evaluador_id,
            descripcion_kpi: item.descripcion_kpi,

            valor_min_malo: item.valor_min_malo,
            valor_max_malo: item.valor_max_malo,
            valor_min_regular: item.valor_min_regular,
            valor_max_regular: item.valor_max_regular,
            valor_min_bueno: item.valor_min_bueno,
            valor_max_bueno: item.valor_max_bueno,

            encuesta: item.encuesta,
            tipo_respuesta_id: item.tipo_respuesta_id,

            disenos_id: 1,
            marquesina: item.cartelera?.marquesina,
            fecha_inicial: item.cartelera?.fecha_inicial,
            fecha_final: item.cartelera?.fecha_final,
            multimedias: [],
        });

        setMyScreens(
            item.cartelera?.pantallas.map((tag) => {
                return { value: tag.id, label: tag.pantalla };
            })
        );

        // setPreviews(item.multimedias);
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
                setIsMulti(false);
                setMyScreens([{ value: "ALL", label: "TODAS" }]);
                setPantallas([{ value: "ALL", label: "TODAS" }]);
            } else {
                const { data: items } = await axios.get(
                    `/api/v1/pantallas/area/${area}/orientacion/${data.orientaciones_id}`
                );
                const lista = items.data.map((item) => {
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

    const onSetOrientacion = async (orientacion) => {
        if (orientacion != orientaciones_id) {
            setPreviews([]);
            await setData({
                ...data,
                multimedias: [],
            });
        }

        setData("orientaciones_id", orientacion);
    };

    const onAddFiles = async (evt) => {
        const files = Array.from(evt.target.files);
        let hasDifferentSize = false;

        await Promise.all(
            files.map((file) => {
                return new Promise((resolve) => {
                    const preview = URL.createObjectURL(file);
                    const img = new Image();
                    img.src = preview;

                    img.onload = () => {
                        let isSizeOk = false;

                        if (data.orientaciones_id === "V") {
                            isSizeOk = img.naturalHeight >= img.naturalWidth;
                        } else {
                            isSizeOk = img.naturalWidth >= img.naturalHeight;
                        }

                        if (isSizeOk) {
                            setPreviews((list) => [
                                ...list,
                                { src: preview, mimetype: file.type },
                            ]);

                            setData((prevData) => ({
                                ...prevData,
                                multimedias: [...prevData.multimedias, file],
                            }));
                        } else {
                            hasDifferentSize = true;
                        }

                        resolve();
                    };
                });
            })
        );

        if (hasDifferentSize) {
            notify(
                "warning",
                "Algunos archivos no se cargaron porque no cumplen con la orientación solicitada. Intenta con otra orientación"
            );
        }
    };

    const onRemoveMedia = async (key, id) => {
        const files = [...data.multimedias];
        files.splice(key, 1);
        setData({
            ...data,
            multimedias: [...files],
        });

        const prevs = [...previews];
        const prev = prevs.splice(key, 1);
        setPreviews([...prevs]);

        if (id) {
            const { data: file } = await axios.delete(
                `/api/v1/multimedias/${id}`
            );
        }
    };

    const onReload = () => {
        if (id) {
            router.visit("/campanas/lista");
        } else {
            router.visit("/campanas");
        }
    };

    const onSurvey = async () => {
        router.visit(`/campanas/encuesta/${id}`);
    };

    const onTest = async () => {
        router.visit(`/campanas/test/${id}`);
    };

    useEffect(() => {
        id && onGetItem();
    }, []);

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
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Campañas
                </h2>
            }
        >
            <Head title="Campañas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end mb-4">
                        <PrimaryButton
                            className="ms-4"
                            onClick={() => onSurvey()}
                        >
                            Encuesta
                        </PrimaryButton>

                        <PrimaryButton
                            className="ms-4"
                            onClick={() => onTest()}
                        >
                            Evaluación
                        </PrimaryButton>

                        <SecondaryButton
                            className="ms-4"
                            onClick={() => onReload()}
                        >
                            Regresar
                        </SecondaryButton>
                    </div>

                    <form onSubmit={submit}>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Campaña
                            </h2>

                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel
                                        htmlFor="nombre"
                                        value="Nombre de Campaña"
                                    />

                                    <TextInput
                                        id="nombre"
                                        name="nombre"
                                        value={data.nombre}
                                        className="mt-1 block w-full"
                                        autoComplete="nombre"
                                        onChange={(e) =>
                                            setData("nombre", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.nombre}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="orientaciones_id"
                                        value="Orientación de Pantalla"
                                    />

                                    <Select
                                        id="orientaciones_id"
                                        name="orientaciones_id"
                                        className="mt-1 block w-full"
                                        value={data.orientaciones_id}
                                        onChange={(e) =>
                                            onSetOrientacion(e.target.value)
                                        }
                                    >
                                        {orientaciones.map((tipo, key) => {
                                            return (
                                                <option
                                                    value={tipo.key}
                                                    key={key}
                                                >
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
                                                <option
                                                    value={tipo.id}
                                                    key={key}
                                                >
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
                                    <InputLabel
                                        htmlFor="ciudades_id"
                                        value="Ciudad"
                                    />

                                    <Select
                                        id="ciudades_id"
                                        name="ciudades_id"
                                        className="mt-1 block w-full"
                                        value={data.ciudades_id}
                                        onChange={(e) =>
                                            setData(
                                                "ciudades_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="ALL"> TODAS </option>
                                        {ciudades.map((tipo, key) => {
                                            return (
                                                <option
                                                    value={tipo.id}
                                                    key={key}
                                                >
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
                                        <option value="ALL"> TODAS </option>

                                        {areas.map((tipo, key) => {
                                            return (
                                                <option
                                                    value={tipo.id}
                                                    key={key}
                                                >
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
                                        className="mt-1 block w-full"
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

                                <div>
                                    <InputLabel
                                        htmlFor="eje"
                                        value="Eje Temático"
                                    />

                                    <TextArea
                                        id="eje"
                                        name="eje"
                                        value={data.eje}
                                        className="mt-1 block w-full"
                                        autoComplete="eje"
                                        onChange={(e) =>
                                            setData("eje", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.eje}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="objetivo"
                                        value="Objetivo Misional"
                                    />

                                    <TextArea
                                        id="objetivo"
                                        name="objetivo"
                                        value={data.objetivo}
                                        className="mt-1 block w-full"
                                        autoComplete="objetivo"
                                        onChange={(e) =>
                                            setData("objetivo", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.objetivo}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="impacto"
                                        value="Impácto Esperado"
                                    />

                                    <TextArea
                                        id="impacto"
                                        name="impacto"
                                        value={data.impacto}
                                        className="mt-1 block w-full"
                                        autoComplete="impacto"
                                        onChange={(e) =>
                                            setData("impacto", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.impacto}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="pregunta"
                                        value="Pregunta de Evaluación"
                                    />

                                    <TextArea
                                        id="pregunta"
                                        name="pregunta"
                                        value={data.pregunta}
                                        className="mt-1 block w-full"
                                        autoComplete="pregunta"
                                        onChange={(e) =>
                                            setData("pregunta", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.pregunta}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                KPI
                            </h2>

                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel
                                        htmlFor="logro_esperado"
                                        value="Logro Esperado"
                                    />

                                    <TextInput
                                        id="logro_esperado"
                                        name="logro_esperado"
                                        type="number"
                                        min="0"
                                        value={data.logro_esperado}
                                        className="mt-1 block w-full"
                                        autoComplete="logro_esperado"
                                        onChange={(e) =>
                                            setData(
                                                "logro_esperado",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.logro_esperado}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="evaluador_id"
                                        value="Usuario Evaluador"
                                    />

                                    <Select
                                        id="evaluador_id"
                                        name="evaluador_id"
                                        value={data.evaluador_id}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "evaluador_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        {users.map((tipo, key) => {
                                            return (
                                                <option
                                                    value={tipo.id}
                                                    key={key}
                                                >
                                                    {" "}
                                                    {tipo.name}{" "}
                                                </option>
                                            );
                                        })}
                                    </Select>

                                    <InputError
                                        message={errors.evaluador_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="descripcion_kpi"
                                        value="Descripción KPI"
                                    />

                                    <TextArea
                                        id="descripcion_kpi"
                                        name="descripcion_kpi"
                                        value={data.descripcion_kpi}
                                        className="mt-1 block w-full"
                                        autoComplete="descripcion_kpi"
                                        onChange={(e) =>
                                            setData(
                                                "descripcion_kpi",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.descripcion_kpi}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <h2 className="mt-5 font-semibold text-xl text-gray-800 leading-tight">
                                Criterios
                            </h2>
                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel
                                        htmlFor="valor_min_malo"
                                        value="% Mínimo Malo"
                                    />

                                    <TextInput
                                        id="valor_min_malo"
                                        name="valor_min_malo"
                                        type="number"
                                        max="100"
                                        min="0"
                                        value={data.valor_min_malo}
                                        className="mt-1 block w-full"
                                        autoComplete="valor_min_malo"
                                        onChange={(e) =>
                                            setData(
                                                "valor_min_malo",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.valor_min_malo}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="valor_max_malo"
                                        value="% Máximo Malo"
                                    />

                                    <TextInput
                                        id="valor_max_malo"
                                        name="valor_max_malo"
                                        type="number"
                                        max="100"
                                        min="0"
                                        value={data.valor_max_malo}
                                        className="mt-1 block w-full"
                                        autoComplete="valor_max_malo"
                                        onChange={(e) =>
                                            setData(
                                                "valor_max_malo",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.valor_max_malo}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="valor_min_regular"
                                        value="% Mínimo Regular"
                                    />

                                    <TextInput
                                        id="valor_min_regular"
                                        name="valor_min_regular"
                                        type="number"
                                        max="100"
                                        min={Number(data.valor_max_malo) + 1}
                                        value={data.valor_min_regular}
                                        className="mt-1 block w-full"
                                        autoComplete="valor_min_regular"
                                        onChange={(e) =>
                                            setData(
                                                "valor_min_regular",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.valor_min_regular}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="valor_min_regular"
                                        value="% Máximo Regular"
                                    />

                                    <TextInput
                                        id="valor_max_regular"
                                        name="valor_max_regular"
                                        type="number"
                                        max="100"
                                        min={Number(data.valor_max_malo) + 1}
                                        value={data.valor_max_regular}
                                        className="mt-1 block w-full"
                                        autoComplete="valor_max_regular"
                                        onChange={(e) =>
                                            setData(
                                                "valor_max_regular",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.valor_max_regular}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="valor_min_bueno"
                                        value="% Mínimo Bueno"
                                    />

                                    <TextInput
                                        id="valor_min_bueno"
                                        name="valor_min_bueno"
                                        type="number"
                                        max="100"
                                        min={Number(data.valor_max_regular) + 1}
                                        value={data.valor_min_bueno}
                                        className="mt-1 block w-full"
                                        autoComplete="valor_min_bueno"
                                        onChange={(e) =>
                                            setData(
                                                "valor_min_bueno",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.valor_min_bueno}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="valor_max_bueno"
                                        value="% Máximo Bueno"
                                    />

                                    <TextInput
                                        id="valor_max_bueno"
                                        name="valor_max_bueno"
                                        type="number"
                                        max="100"
                                        min={Number(data.valor_max_regular) + 1}
                                        value={data.valor_max_bueno}
                                        className="mt-1 block w-full"
                                        autoComplete="valor_max_bueno"
                                        onChange={(e) =>
                                            setData(
                                                "valor_max_bueno",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.valor_max_bueno}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Encuesta de Satisfacción para usuarios finales
                            </h2>

                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel
                                        htmlFor="encuesta"
                                        value="Pregunta de Encuesta"
                                    />

                                    <TextInput
                                        id="encuesta"
                                        name="unidades"
                                        type="text"
                                        value={data.encuesta}
                                        className="mt-1 block w-full"
                                        autoComplete="encuesta"
                                        onChange={(e) =>
                                            setData("encuesta", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.encuesta}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="tipo_respuesta_id"
                                        value="Tipo de Respuesta"
                                    />

                                    <Select
                                        id="tipo_respuesta_id"
                                        name="tipo_respuesta_id"
                                        value={data.tipo_respuesta_id}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "tipo_respuesta_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        {tipos_respuesta.map((tipo, key) => {
                                            return (
                                                <option
                                                    value={tipo.id}
                                                    key={key}
                                                >
                                                    {" "}
                                                    {tipo.tipo}{" "}
                                                </option>
                                            );
                                        })}
                                    </Select>

                                    <InputError
                                        message={errors.tipo_respuesta_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Cartelera
                            </h2>

                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel
                                        htmlFor="fecha_inicial"
                                        value="Fecha inicial"
                                    />

                                    <TextInput
                                        id="fecha_inicial"
                                        name="fecha_inicial"
                                        type="date"
                                        value={data.fecha_inicial}
                                        className="mt-1 block w-full"
                                        autoComplete="fecha_inicial"
                                        onChange={(e) =>
                                            setData(
                                                "fecha_inicial",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.fecha_inicial}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="fecha_final"
                                        value="Fecha final"
                                    />

                                    <TextInput
                                        id="fecha_final"
                                        name="fecha_final"
                                        type="date"
                                        value={data.fecha_final}
                                        min={data.fecha_inicial}
                                        className="mt-1 block w-full"
                                        autoComplete="fecha_final"
                                        onChange={(e) =>
                                            setData(
                                                "fecha_final",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.fecha_final}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="arhcivos"
                                        value="Arhcivos"
                                    />

                                    <TextInput
                                        accept="image/*, video/*"
                                        multiple
                                        id="arhcivos"
                                        name="arhcivos"
                                        type="file"
                                        value={data.arhcivos}
                                        min={data.arhcivos}
                                        className="hidden mt-1 block w-full"
                                        autoComplete="arhcivos"
                                        ref={filesRef}
                                        onChange={onAddFiles}
                                    />

                                    <SecondaryButton
                                        className="w-full text"
                                        disabled={processing}
                                        onClick={() => {
                                            filesRef.current.click();
                                        }}
                                    >
                                        {" "}
                                        Elegir Archivos{" "}
                                    </SecondaryButton>

                                    <InputError
                                        message={errors.arhcivos}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="marquesina"
                                        value="Marquesina"
                                    />

                                    <TextArea
                                        id="marquesina"
                                        name="marquesina"
                                        value={data.marquesina}
                                        className="mt-1 block w-full"
                                        autoComplete="marquesina"
                                        onChange={(e) =>
                                            setData(
                                                "marquesina",
                                                e.target.value
                                            )
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

                            <div className="grid grid-cols-4 gap-4 mt-2">
                                {previews.map((media, key) => {
                                    return (
                                        <div
                                            className="grid-item border rounded shadow p-2"
                                            key={key}
                                        >
                                            <Icon
                                                name="trash"
                                                className="cursor-pointer h-4 text-red-400 fill-current"
                                                onClick={() =>
                                                    onRemoveMedia(key, media.id)
                                                }
                                            />
                                            {media.mimetype.includes(
                                                "image"
                                            ) ? (
                                                <img
                                                    className="media preview"
                                                    src={media.src}
                                                    alt=""
                                                />
                                            ) : (
                                                <video
                                                    className="media preview"
                                                    alt=""
                                                    controls
                                                >
                                                    <source
                                                        src={media.src}
                                                    ></source>
                                                </video>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
