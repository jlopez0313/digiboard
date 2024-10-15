import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [show, setShow] = useState( false )
    return (
        <div className="">
            <Head title="Welcome" />

            <div className="slider pt-4 px-10 px-md-20">

                <div className=" header flex flex-wrap items-center top-0 w-full">
                    <div className="logo">
                        <img className="logo-img" src="img/logo.png" alt="" />
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden grow flex justify-end ">
                        <button
                            className="items-center text-white p-3"
                            data-collapse-toggle="navbar-default"
                            onClick={() => setShow(!show)}
                        >
                            <svg
                                className="block h-4 w-4 fill-current"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Mobile menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                            </svg>
                        </button>

                        <div
                            className={`bg-white absolute right-11 top-20 w-80 ${show ? '' : 'hidden'}`}
                            id="navbar-default"
                        >
                            <ul className="font-medium flex flex-col px-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
                                <li>
                                    <a
                                        href="#"
                                        className="text-center block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        onClick={() => setShow( false )}
                                    >
                                        Inicio
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#funcionalidad"
                                        className="text-center block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        onClick={() => setShow( false )}
                                    >
                                        Funcionalidades
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#planes"
                                        className="text-center block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        onClick={() => setShow( false )}
                                    >
                                        Planes de Pago
                                    </a>
                                </li>
                                {auth.user ? (
                                    <li>
                                        {" "}
                                        <a
                                            href="/dashboard"
                                            className="text-center block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                            onClick={() => setShow( false )}
                                        >
                                            Dashboard
                                        </a>
                                    </li>
                                ) : (
                                    <>
                                        <li>
                                            <a
                                                href="#"
                                                className="text-center block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                                onClick={() => setShow( false )}
                                            >
                                                Registro
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={route("login")}
                                                className="text-center block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                                onClick={() => setShow( false )}
                                            >
                                                Log in
                                            </a>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Web Menu */}
                    <div className=" hidden md:block grow p-8 text-end menu ">
                        <a
                            href="#"
                            className="me-6 font-semibold text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Inicio
                        </a>
                        <a
                            href="#funcionalidad"
                            className="me-6 font-semibold text-white hover:text-gray-400 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Funcionalidades
                        </a>
                        <a
                            href="#planes"
                            className="me-6 font-semibold text-white hover:text-gray-400 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Planes de Pago
                        </a>
                        {auth.user ? (
                            <a
                                href="#"
                                className="me-6 font-semibold text-white hover:text-gray-400 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Dashboard
                            </a>
                        ) : (
                            <>
                                <a
                                    href="#"
                                    className="me-6 font-semibold text-white hover:text-gray-400 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Registro
                                </a>
                                <a
                                    href={route("login")}
                                    className="me-6 font-semibold text-white hover:text-gray-400 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Log in
                                </a>
                            </>
                        )}
                    </div>
                </div>

                <div className="mx-auto max-w-7xl">
                    <h1 className="big-title pt-5 text-white">
                        {" "}
                        Revoluciona la comunicación{" "}
                    </h1>
                    <div className="flex justify-between items-center  text-white">
                        <div>
                            <h1 className="big-title">
                                de tu empresa con
                                <span className="digiboard">
                                    {" "}
                                    DigiBoard <span className="pro">Pro </span>{" "}
                                </span>
                            </h1>

                            <p className="w-full mb-8">
                                Somos una plataforma autoadministrable diseñada para entregar información verídica, eficiente e "in situ" a través de pantallas digitales estratégicamente ubicadas.
                            </p>

                            
                            <div className="flex mb-10">
                                <PrimaryButton className="primary-button">
                                    {" "}
                                    Comunícate con un asesor{" "}
                                </PrimaryButton>
                            </div>
                        </div>
                        <img src="img/tablet.png" className="max-h-80 hidden md:block" />
                    </div>
                </div>
            
            </div>

            <div className="eficiente flex flex-col md:flex-row items-center justify-around my-6 px-10">
                <div>
                    <h1 className="max-w-md big-title"> La forma más eficiente de <span className="rounded-full text-center px-4 hablarle">hablarle</span> a tus clientes </h1>
                </div>
                <div>
                    <ul className="max-w-96">
                        <li className="mb-3 text-white rounded-full flex p-1 items-center justify-between item item-1"> 
                            <div className="w-6 h-6 rounded-full border bg-white"></div> 
                            <span className="w-full ps-5 text-wrap"> Comunicación Interna y Externa </span>
                            </li>
                        <li className="mb-3 text-white rounded-full flex p-1 items-center justify-between item item-2"> 
                            <div className="w-6 h-6 rounded-full border bg-white"></div> 
                            <span className="w-full ps-5 text-wrap"> Eficiencia Operativa </span>
                            </li>
                        <li className="mb-3 text-white rounded-full flex p-1 items-center justify-between item item-3"> 
                            <div className="w-6 h-6 rounded-full border bg-white"></div> 
                            <span className="w-full ps-5 text-wrap"> Cumplimient normativo y transparencia </span>
                            </li>
                        <li className="mb-3 text-white rounded-full flex p-1 items-center justify-between item item-4"> 
                            <div className="w-6 h-6 rounded-full border bg-white"></div> 
                            <span className="w-full ps-5 text-wrap"> Diseña contenidos con presición </span>
                            </li>
                        <li className="mb-3 text-white rounded-full flex p-1 items-center justify-between item item-5"> 
                            <div className="w-6 h-6 rounded-full border bg-white"></div> 
                            <span className="w-full ps-5 text-wrap"> Eficiencia en la comunicación </span>
                            </li>
                        <li className="mb-3 text-white rounded-full flex p-1 items-center justify-between item item-6"> 
                            <div className="w-6 h-6 rounded-full border bg-white"></div> 
                            <span className="w-full ps-5 text-wrap"> Plataforma autoadministrable </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mb-6">
                <img src="img/crowd.png" style={{width: '100%'}} alt="" />
            </div>

            <div className="text-center">
                <b className="title-black">
                    {" "}
                    ¿Estas listo para mejorar la comunicación de tu empresa?{" "}
                </b>
            </div>

            <div className="planes flex flex-col md:flex-row content-center justify-center my-6">
                <div className="light card-2 rounded-2xl mx-4 px-7 pt-5 pb-2 my-5 md:my-0 flex-1">
                    
                    <div className="min-h-72 rounded-2xl card-body flex flex-col mb-4">
                        <div>
                            <span className="font-bold title py-1 px-2 float-right mt-6 rounded-l-lg pe-20"> LIGHT </span>
                        </div>
                        <p className="px-7 my-3 text-center">
                            <span className="font-bold m-auto desc"> Alquiler de pantallas + Paquete de banners </span>
                        </p>
                        <ul className="list mb-8 text-gray-700">
                            <li className="mb-2"> Alquiler de pantallas y venta de paquete de banners según sus necesidades. </li>
                            <li className="mb-2"> Adicional, diseño de banners por parte de DigiBoard Pro </li>
                        </ul>
                    </div>

                    <PrimaryButton className="bg-transparent !block w-full">
                        {" "}
                        Comienza ahora{" "}
                    </PrimaryButton>
                </div>
                <div className="pro card-2 rounded-2xl mx-4 px-7 pt-5 pb-2 my-5 md:my-0 flex-1">
                    
                    <div className="min-h-72 rounded-2xl card-body flex flex-col mb-4">
                        <div>
                            <span className="font-bold title py-1 px-2 float-right mt-6 rounded-l-lg pe-20"> PRO </span>
                        </div>
                        <p className="px-7 my-3 text-center">
                            <span className="font-bold m-auto desc"> Venta de equipos + Suscripción a la plataforma </span>
                        </p>
                        <ul className="mb-8 text-gray-700">
                            <li className="mb-2"> Venta de equipos y ofrecimiento de una suscripción para el uso de la plataforma con tres planes diferentes acomodados a su necesidad. </li>
                        </ul>
                    </div>

                    <PrimaryButton className="bg-transparent !block w-full">
                        {" "}
                        Comienza ahora{" "}
                    </PrimaryButton>
                </div>
                <div className="business card-2 rounded-2xl mx-4 px-7 pt-5 pb-2 my-5 md:my-0 flex-1">  
                    
                    <div className="min-h-72 rounded-2xl card-body flex flex-col mb-4">
                        <div>
                            <span className="font-bold title py-1 px-2 float-right mt-6 rounded-l-lg pe-10"> BUSINESS </span>
                        </div>
                        <p className="px-7 my-3 text-center">
                            <span className="font-bold m-auto desc"> Venta de pantallas + Paquetes de banners </span>
                        </p>
                        <ul className="mb-8 text-gray-700">
                            <li className="mb-2"> Venta de pantallas y paquete de banners según sus necesidades. </li>
                            <li className="mb-2"> Adicional, la realizacion de banners por parte de DigiBoard Pro </li>
                        </ul>
                    </div>

                    <PrimaryButton className="bg-transparent !block w-full">
                        {" "}
                        Comienza ahora{" "}
                    </PrimaryButton>
                </div>
            </div>

            <div className="text-center" id="planes">
                <b className="title-black"> ¿Tienes mas necesidades? </b>
            </div>
            
            <div className="flex content-center justify-center my-3">
                <PrimaryButton className="primary-button !block text-white">
                    {" "}
                    Llamanos{" "}
                </PrimaryButton>
            </div>
            <div className="text-center mb-6">
                <span className="text-gray-600"> Hacemos parte de tu plan </span>
            </div>

            <footer className="flex flex-col content-center justify-center">
                <div className="w-full flex justify-center">
                    <img className="mx-3" src="img/facebook.png" alt="" />
                    <img className="mx-3" src="img/youtube.png" alt="" />
                    <img className="mx-3" src="img/instagram.png" alt="" />
                </div>
                <div className="w-full text-center">
                    <span>@DIGIBOARDPRO / ALL RIGHTS RESERVED </span>
                </div>
            </footer>
        </div>
    );
}
