import React, { useEffect, useRef, useState } from "react";

import EmptyLayout from "@/Layouts/EmptyLayout";
import { Head } from "@inertiajs/react";
import { Carousel } from "@material-tailwind/react";
import { AdminModal } from "@/Components/AdminModal";
import axios from "axios";
import QRCode from "react-qr-code";
import styles from './index.module.css'
import ApplicationLogo from "@/Components/ApplicationLogo";

export default ({ auth, pantalla }) => {
    console.log(pantalla);

    const [delay, setDelay] = useState(12500);
    const [show, setShow] = useState(true);
    const [adminModal, setAdminModal] = useState(false);
    const [screen, setScreen] = useState(pantalla);

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

            await axios.post(`/api/v1/asignacion/activar/${screen.id}`, body);

            onRefresh();
        }
    };

    const onRefresh = () => {
        setInterval(async () => {
            // const { data } = await axios.get(`/api/v1/asignacion/${screen.id}`);
            // setScreen() ;
        }, 1000 * 60 * 30);
    };

    const onGetDelay = (evt) => {
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

        await axios.post(`/api/v1/asignacion/activar/${screen.id}`, body);
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

                    <div className={`rounded px-1 py-1 ${styles.encuesta}`}>
                        <ApplicationLogo className='m-auto' />

                        <p className='font-bold text-lg text-white m-auto text-center'>
                            { screen.cartelera.campana?.encuesta }
                        </p>
                        <QRCode
                            size={200}
                            className="mx-auto my-3"
                            style={{
                                height: "auto",
                                maxWidth: "90%",
                                width: "90%",
                            }}
                            value={"http://gobernacion.localhost:8000/evaluacion/" + screen.cartelera.campana.id }
                            viewBox={`0 0 200 200`}
                        />
                    </div>

                    <Carousel
                        loop={true}
                        autoplay={true}
                        autoplayDelay={delay}
                        navigation={() => null}
                        prevArrow={() => null}
                        nextArrow={() => null}
                    >
                        {screen.cartelera.medias.map((foto, key) => {
                            return (
                                <div
                                    key={key}
                                    className="w-100 sm:h-44 md:h-full flex-shrink-0 flex items-center justify-center"
                                >
                                    {foto.mime_type.includes("image") ? (
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
                                            onLoadedData={onGetDelay}
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
                        {screen.cartelera.marquesina}{" "}
                    </marquee>
                </EmptyLayout>
            ) : null}

            <AdminModal
                title={"Ingresar Código"}
                show={adminModal}
                setIsOpen={setAdminModal}
                onConfirm={onConfirm}
                url={`/api/v1/asignacion/codigo/${screen.id}`}
            ></AdminModal>
        </>
    );
};
