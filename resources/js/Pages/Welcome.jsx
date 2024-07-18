import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [show, setShow] = useState( false )
    return (
        <div className="pt-20">
            <Head title="Welcome" />
            <div className=" header flex flex-wrap items-center fixed top-0 w-full bg-white">
                <div className="logo">
                    <img src="img/logo.png" alt="" />
                </div>

                <div className="md:hidden grow flex justify-end">
                    <button
                        className="items-center text-blue-600 p-3"
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
                        className={`absolute right-0 top-20 w-full ${show ? '' : 'hidden'}`}
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
                                        href="#"
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

                <div className=" hidden md:block grow p-8 text-end border-b-8 menu">
                    <a
                        href="#"
                        className="me-6 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Inicio
                    </a>
                    <a
                        href="#funcionalidad"
                        className="me-6 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Funcionalidades
                    </a>
                    <a
                        href="#planes"
                        className="me-6 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Planes de Pago
                    </a>
                    {auth.user ? (
                        <a
                            href="#"
                            className="me-6 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </a>
                    ) : (
                        <>
                            <a
                                href="#"
                                className="me-6 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Registro
                            </a>
                            <a
                                href={route("login")}
                                className="me-6 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </a>
                        </>
                    )}
                </div>
            </div>

            <div className="m-auto max-w-sm md:max-w-4xl mt-20">
                <h1 className="big-title pt-5">
                    {" "}
                    Revoluciona la comunicación{" "}
                </h1>
                <div className="flex justify-center items-center">
                    <div>
                        <h1 className="big-title">
                            de tu empresa con
                            <span className="digiboard">
                                {" "}
                                DIGIBOARD<span className="pro">pro </span>{" "}
                            </span>
                        </h1>
                        <p className="pro w-5/6 mb-7">
                            La solucion integral para la gestion efectiva de
                            contenidos digitales
                        </p>
                        <div className="flex mb-10">
                            <SecondaryButton className="secondary-button text-white me-12">
                                {" "}
                                Regístrate Ahora{" "}
                            </SecondaryButton>
                            <PrimaryButton className="primary-button">
                                {" "}
                                Obtén un Demo{" "}
                            </PrimaryButton>
                        </div>

                        <p className="w-full md: w-4/6">
                            DigiboardPro es el sistema ideal para gestionar las
                            comunicaciones institucionales de manera
                            centralizada, ágil y sencilla.
                        </p>
                    </div>
                    <img src="img/tablet.png" className="hidden md:block" />
                </div>
            </div>

            <div className="text-center mt-8" id="funcionalidad">
                <b className="title-black">
                    {" "}
                    Tu forma favorita de hablarle a tus clientes{" "}
                </b>
            </div>

            <div className="flex flex-col md:flex-row content-center justify-center my-5">
                <div className="card text-center rounded-md border-2 border-gray-200 mx-4 p-2 my-5 md:my-0">
                    <span> Configura y gestiona pantallas digitales </span>
                    <p className="mb-4 mt-2">
                        Centraliza el control y la programación de contenidos en
                        pantallas digitales, rompiendo las barreras de tiempo y
                        distancia entre diferentes puntos de visualización
                    </p>
                    <PrimaryButton className="primary-button my-1">
                        {" "}
                        Obtén un Demo{" "}
                    </PrimaryButton>
                </div>
                <div className="card text-center rounded-md border-2 border-gray-200 mx-4 p-2 my-5 md:my-0">
                    <span> Configura y gestiona pantallas digitales </span>
                    <p className="mb-4 mt-2">
                        Centraliza el control y la programación de contenidos en
                        pantallas digitales, rompiendo las barreras de tiempo y
                        distancia entre diferentes puntos de visualización
                    </p>
                    <PrimaryButton className="primary-button my-1">
                        {" "}
                        Obtén un Demo{" "}
                    </PrimaryButton>
                </div>
                <div className="card text-center rounded-md border-2 border-gray-200 mx-4 p-2 my-5 md:my-0">
                    <span> Configura y gestiona pantallas digitales </span>
                    <p className="mb-4 mt-2">
                        Centraliza el control y la programación de contenidos en
                        pantallas digitales, rompiendo las barreras de tiempo y
                        distancia entre diferentes puntos de visualización
                    </p>
                    <PrimaryButton className="primary-button my-1">
                        {" "}
                        Obtén un Demo{" "}
                    </PrimaryButton>
                </div>
            </div>

            <div className="text-center">
                <b className="title-black">
                    {" "}
                    ¿Estas listo para mejorar la comunicación de tu empresa?{" "}
                </b>
            </div>

            <div className="flex content-center justify-center my-5">
                <SecondaryButton className="secondary-button !block text-white">
                    {" "}
                    Regístrate Ahora{" "}
                </SecondaryButton>
            </div>

            <div className="text-center" id="planes">
                <b className="title-black"> Nuestros planes </b>
            </div>

            <div className="flex flex-col md:flex-row content-center justify-center my-2">
                <div className="card-2 shadow-md rounded-md border-2 border-gray-200 mx-4 px-7 py-5 my-5 md:my-0">
                    <span> Plan 1 name </span>
                    <p>
                        <span className="price"> $X </span>
                        <span> per month </span>
                    </p>
                    <ul className="mb-8">
                        <li className="mb-2"> Feature 1</li>
                        <li className="mb-2"> Feature 2</li>
                        <li className="mb-2"> Feature 3</li>
                        <li className="mb-2"> Feature 4</li>
                    </ul>

                    <PrimaryButton className="primary-button !block w-full">
                        {" "}
                        Button{" "}
                    </PrimaryButton>
                </div>
                <div className="card-2 shadow-md rounded-md border-2 border-gray-200 mx-4 px-7 py-5 my-5 md:my-0">
                    <span> Plan 2 name </span>
                    <p>
                        <span className="price"> $X </span>
                        <span> per month </span>
                    </p>
                    <ul className="mb-8">
                        <li className="mb-2 text-gray-600"> Feature 1</li>
                        <li className="mb-2 text-gray-600"> Feature 2</li>
                        <li className="mb-2 text-gray-600"> Feature 3</li>
                        <li className="mb-2 text-gray-600"> Feature 4</li>
                    </ul>
                    <PrimaryButton className="primary-button !block w-full">
                        {" "}
                        Button{" "}
                    </PrimaryButton>
                </div>
            </div>

            <footer className="flex flex-col content-center justify-center">
                <div className="w-full flex justify-center mt-12">
                    <img className="me-7" src="img/facebook.png" alt="" />
                    <img className="me-7" src="img/youtube.png" alt="" />
                    <img className="me-7" src="img/instagram.png" alt="" />
                </div>
                <div className="w-full text-center mt-5">
                    <span>@DIGIBOARDPRO / ALL RIGHTS RESERVED </span>
                </div>
            </footer>
        </div>
    );
}
