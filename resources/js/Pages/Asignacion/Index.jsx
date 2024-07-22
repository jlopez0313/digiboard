import React, { useEffect, useRef, useState } from "react";

import EmptyLayout from "@/Layouts/EmptyLayout";
import { Head } from "@inertiajs/react";
import { Carousel } from "@material-tailwind/react";
import { AdminModal } from "@/Components/AdminModal";
import axios from "axios";

export default ({ auth, pantalla }) => {
    
    const [delay, setDelay] = useState(12500);
    const [show, setShow] = useState(true);
    const [adminModal, setAdminModal] = useState(false);

    const onSetAdminModal = () => {
        setAdminModal(true);
    };

    const onConfirm = async ({ data: { data } }) => {
        if (data) {
            setAdminModal(false);
            setShow(true);
            const body = {
                estado: "A",
            };

            await axios.post(`/api/v1/asignacion/activar/${pantalla.id}`, body);
        }
    };

    const onGetDelay = ( evt ) => {
        /* const duration = evt.target.duration * 1000;
        if ( !delay || delay < duration) {
            console.log( duration );
            setDelay( duration )
        }
        */
    };

    const onDestroy = async () => {
        const body = {
            estado: "I",
        };

        await axios.post(`/api/v1/asignacion/activar/${pantalla.id}`, body);
    };

    useEffect(() => {
        onSetAdminModal();
        return () => onDestroy();
    }, []);

    return (
        <>
            {show ? (
                <EmptyLayout
                    user={auth.user}
                    header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Carteleras
                        </h2>
                    }
                >
                    <Head title="Carteleras" />

                    <Carousel
                        loop={true}
                        autoplay={true}
                        autoplayDelay={ delay }
                        navigation={() => null}
                        prevArrow={() => null}
                        nextArrow={() => null}
                    >
                        {pantalla.cartelera.multimedias.map((foto, key) => {
                            return (
                                <div
                                    key={key}
                                    className="w-100 sm:h-44 md:h-full flex-shrink-0 flex items-center justify-center"
                                >
                                    {foto.mimetype.includes("image") ? (
                                        <img
                                            className="h-full w-full object-cover rounded-md"
                                            src={"/" + foto.src}
                                            alt=""
                                        />
                                    ) : (
                                        <video
                                            className="h-full w-full object-cover rounded-md"
                                            alt=""
                                            controls
                                            autoPlay={false}
                                            onLoadedData={ onGetDelay }
                                        >
                                            <source
                                                src={"/" + foto.src}
                                            ></source>
                                        </video>
                                    )}
                                </div>
                            );
                        })}
                    </Carousel>

                    <marquee className="text-white marquee text-3xl md:text-4xl lg:text-5xl p-3 my-3">
                        {" "}
                        {pantalla.cartelera.marquesina}{" "}
                    </marquee>

                </EmptyLayout>
            ) : null}

            <AdminModal
                title={"Ingresar Código"}
                show={adminModal}
                setIsOpen={setAdminModal}
                onConfirm={onConfirm}
                url={`/api/v1/asignacion/codigo/${pantalla.id}`}
            ></AdminModal>
        </>
    );
};
