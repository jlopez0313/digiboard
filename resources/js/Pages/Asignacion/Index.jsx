import React, { useEffect, useState } from "react";

import EmptyLayout from "@/Layouts/EmptyLayout";
import { Head } from "@inertiajs/react";
import { AdminModal } from "@/Components/AdminModal";
import axios from "axios";
import QRCode from "react-qr-code";
import styles from "./index.module.css";
import ApplicationLogo from "@/Components/ApplicationLogo";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";

export default ({ auth, pantalla, parametros, tenant }) => {
    
    const initDelay = 12500
    const [delay, setDelay] = useState(initDelay);
    const [show, setShow] = useState(true);
    const [adminModal, setAdminModal] = useState(false);
    const [screen, setScreen] = useState(pantalla);

    const swiperRef = useRef(null);
    const videoRef = useRef([]);

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
            const { data } = await axios.post(
                `/api/v1/asignacion/${screen.id}`
            );
            setScreen(data);
        }, 1000 * 60 * 30);
    };

    const onSwiperInit = (swiper) => {
        console.log('onSwiperInit')

        swiperRef.current = swiper;
        const firstSlide = swiper.slides[0];
        const video = firstSlide?.querySelector("video");
    
        onVideoStart( video )
    };

    const onSlideChange = (swiper) => {
        console.log('onSlideChange')

        const currentSlide = swiper.slides[swiper.activeIndex];
        const video = currentSlide.querySelector("video");

        onVideoStart( video )
    };

    const onVideoStart = (video) => {
        if (video) {
            swiperRef.current.autoplay.stop();

            setTimeout(()=> {
                video.play().catch((error) => console.error("Error al reproducir:", error));
                video.mutedm = false;
            }, 1000)
        } else {
            swiperRef.current.autoplay.start();
        }
    }

    const onVideoEnd = () => {
        setDelay(initDelay)

        if (swiperRef.current) {
            const swiper = swiperRef.current;

            if (swiper.activeIndex === swiper.slides.length - 1) {
                swiper.slideTo(0);
            } else {
                swiper.slideNext();
            }
        }
    };

    const onSetDelay = (evt) => {
        console.log('onsetdelay')
        setDelay(evt.target.duration * 1000)
    }

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
                    parametros={parametros}
                    header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Carteleras
                        </h2>
                    }
                >
                    <Head title="Carteleras" />
                    {screen?.cartelera?.campana && !adminModal && (
                        <div className={`rounded px-1 py-1 ${styles.encuesta}`}>
                            {
                                <ApplicationLogo
                                    className="m-auto"
                                    logo={"/" + tenant + "/" + parametros?.logo}
                                />
                            }

                            <p className="font-bold text-lg text-white m-auto text-center">
                                {screen?.cartelera?.campana?.encuesta}
                            </p>
                            <QRCode
                                size={180}
                                className="mx-auto my-3"
                                style={{
                                    height: "auto",
                                    maxWidth: "90%",
                                    width: "90%",
                                }}
                                value={
                                    window.location.origin +
                                    "/evaluacion/" +
                                    screen?.cartelera?.campana?.id
                                }
                                viewBox={`0 0 180 180`}
                            />
                        </div>
                    )}

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
                        modules={[Autoplay]}
                        onSwiper={onSwiperInit}  // Asegura que el video se inicie al montar
                        onSlideChange={onSlideChange}
                    >
                        {screen?.cartelera?.multimedias?.map((foto, key) => {
                            return (
                                <SwiperSlide
                                    key={key}
                                    className="h-full w-full"
                                >
                                    {foto.mimetype.includes("image") ? (
                                        <>
                                            <img
                                                className="m-auto !w-auto !h-full"
                                                src={
                                                    "/" +
                                                    tenant +
                                                    "/" +
                                                    foto.src
                                                }
                                                alt=""
                                                loading="lazy"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <video
                                                ref={(el) => (videoRef.current[key] = el)}
                                                className="m-auto !w-auto !h-full"
                                                controls
                                                muted 
                                                onLoadedData={(evt) => onSetDelay(evt)}
                                                onEnded={onVideoEnd}
                                                loading="lazy"
                                            >
                                                <source
                                                    src={
                                                        "/" +
                                                        tenant +
                                                        "/" +
                                                        foto.src
                                                    }
                                                ></source>
                                            </video>
                                        </>
                                    )}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {
                        screen?.cartelera?.marquesina ? <marquee
                            className={`text-white marquee text-3xl md:text-4xl lg:text-5xl p-3 my-3 ${styles["marquee"]}`}
                        >
                            {" "}
                            {screen?.cartelera?.marquesina}{" "}
                        </marquee> : null
                    }
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
