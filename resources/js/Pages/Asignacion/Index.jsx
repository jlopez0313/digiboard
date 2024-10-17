import React, { useEffect, useState } from "react";

import EmptyLayout from "@/Layouts/EmptyLayout";
import { Head } from "@inertiajs/react";
import { AdminModal } from "@/Components/AdminModal";
import axios from "axios";
import QRCode from "react-qr-code";
import styles from "./index.module.css";
import ApplicationLogo from "@/Components/ApplicationLogo";

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default ({ auth, pantalla, tenant }) => {
    
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
            const { data } = await axios.post(`/api/v1/asignacion/${screen.id}`);
            setScreen( data ) ;
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
                        {/*
                            <ApplicationLogo className="m-auto" />
                        */}

                        <p className="font-bold text-lg text-white m-auto text-center">
                            {screen.cartelera.campana?.encuesta}
                        </p>
                        <QRCode
                            size={200}
                            className="mx-auto my-3"
                            style={{
                                height: "auto",
                                maxWidth: "90%",
                                width: "90%",
                            }}
                            value={
                                window.location.origin + '/evaluacion/' +
                                screen.cartelera.campana.id
                            }
                            viewBox={`0 0 200 200`}
                        />
                    </div>

                    <Swiper
                        className="mySwiper h-full w-full"
                        spaceBetween={10}
                        slidesPerView={1}
                        centeredSlides={true}
                        centeredSlidesBounds={true}
                        autoplay={{
                            delay: delay,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay, ]}
                    >
                        {screen.cartelera.multimedias.map((foto, key) => {
                            return (
                                <SwiperSlide
                                    key={key}
                                    className="h-full w-full"
                                >
                                    {foto.mimetype.includes("image") ? (
                                        <>
                                        <img
                                            className="m-auto !w-auto !h-full"
                                            src={"/" + tenant + "/" + foto.src}
                                            alt=""
                                        />
                                        </>
                                    ) : (
                                        <>
                                        <video
                                            className="m-auto !w-auto !h-full"
                                            alt=""
                                            controls
                                            autoPlay={false}
                                            onLoadedData={onGetDelay}                                            
                                        >
                                            <source
                                                src={"/" + foto.src}
                                            ></source>
                                        </video>

                                        </>
                                    )}
                                </SwiperSlide>
                            );
                        })}

                    </Swiper>

                    <marquee className={`text-white marquee text-3xl md:text-4xl lg:text-5xl p-3 my-3 ${styles['marquee']}`}>
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
