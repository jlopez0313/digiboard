import InputError from "@/Components/Form/InputError";
import InputLabel from "@/Components/Form/InputLabel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import TextInput from "@/Components/Form/TextInput";
import Select from "@/Components/Form/Select";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import TextArea from "@/Components/Form/TextArea";
import Icon from "@/Components/Icons/Index";
import { notify } from "@/Helpers/Notify";

export const Form = ({ id, tenant, orientaciones, setIsOpen, onReload }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [previews, setPreviews] = useState([]);
    const filesRef = useRef(null);

    const { data, setData, processing, errors, reset } = useForm({
        disenos_id: 1,
        marquesina: "",
        orientaciones_id: "",
        fecha_inicial: "",
        fecha_final: "",
        multimedias: [],
    });

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "multimedias") {
                for (const file of data[key]) {
                    formData.append("multimedias[]", file); // appending every file to formdata
                }
            } else {
                formData.append(key, data[key]);
            }
        });

        try {
            if (id) {
                formData.append("_method", "PUT");
                await axios.post(`/api/v1/carteleras/${id}`, formData);
            } else {
                await axios.post(`/api/v1/carteleras`, formData);
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
        const { data } = await axios.get(`/api/v1/carteleras/${id}`);
        const item = { ...data.data };

        setData({
            disenos_id: item.diseno?.id,
            orientaciones_id: item.orientaciones_id,
            marquesina: item.marquesina,
            fecha_inicial: item.fecha_inicial,
            fecha_final: item.fecha_final,
            multimedias: [],
        });

        setPreviews(
            item.multimedias.map((x) => {
                return { ...x, src: `${tenant}/` + x.src };
            })
        );
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

                    if (file.type.includes("image")) {
                        const img = new Image();
                        img.src = preview;

                        img.onload = () => {
                            let isSizeOk = false;

                            if (data.orientaciones_id === "V") {
                                isSizeOk =
                                    img.naturalHeight >= img.naturalWidth;
                            } else {
                                isSizeOk =
                                    img.naturalWidth >= img.naturalHeight;
                            }

                            if (isSizeOk) {
                                setPreviews((list) => [
                                    ...list,
                                    { src: preview, mimetype: file.type },
                                ]);

                                setData((prevData) => ({
                                    ...prevData,
                                    multimedias: [
                                        ...prevData.multimedias,
                                        file,
                                    ],
                                }));
                            } else {
                                hasDifferentSize = true;
                            }

                            resolve();
                        };
                    } else if (file.type.includes("video")) {
                        const video = document.createElement("video");
                        video.src = preview;
                        video.crossOrigin = "anonymous"; // Evita problemas con videos externos
                        video.muted = true;
                        video.playsInline = true;

                        video.onloadeddata = () => {
                            video.currentTime = 1; // Extrae el fotograma en el segundo 1 (puedes cambiarlo)

                            video.onseeked = () => {
                                const canvas = document.createElement("canvas");
                                const ctx = canvas.getContext("2d");

                                canvas.width = video.videoWidth;
                                canvas.height = video.videoHeight;
                                ctx.drawImage(
                                    video,
                                    0,
                                    0,
                                    canvas.width,
                                    canvas.height
                                );

                                const thumbnail =
                                    canvas.toDataURL("image/jpeg"); // Miniatura en formato base64

                                setPreviews((list) => [
                                    ...list,
                                    { src: thumbnail, mimetype: "image/jpeg" }, // Almacena la miniatura
                                ]);

                                setData((prevData) => ({
                                    ...prevData,
                                    multimedias: [
                                        ...prevData.multimedias,
                                        file,
                                    ],
                                }));
                            };
                        };
                    }
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

    useEffect(() => {
        id && onGetItem();
    }, []);

    return (
        <div className="pb-12 pt-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
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
                                    onSetOrientacion(e.target.value)
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

                        <div>
                            <InputLabel
                                htmlFor="fecha_inicial"
                                value="Fecha inicial"
                            />

                            <TextInput
                                id="fecha_inicial"
                                name="fecha_inicial"
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
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
                                    setData("fecha_final", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.fecha_final}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="arhcivos" value="Arhcivos" />

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
                                    onClick={() => onRemoveMedia(key, media.id)}
                                />
                                {media.mimetype.includes("image") ? (
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
                                        <source src={media.src}></source>
                                    </video>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
