import React, { useEffect, useState } from "react";
// import Layout from '@/Components/Layout';
// import SearchFilter from '@/Shared/SearchFilter';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from "moment";
import "moment/locale/es.js";

// moment.locale('es');

const localizer = momentLocalizer(moment);

const messages = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango.",
};

export default ({ auth, contacts }) => {
    const { data } = contacts;

    const [list, setList] = useState([]);
    const [id, setId] = useState(null);
    const [show, setShow] = useState(false);

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const onSetList = () => {
        const _list = data.map((item) => {
            return {
                id: item.id,
                start: item.cartelera?.fecha_inicial,
                end: item.cartelera?.fecha_final,
                title: item.nombre,
                allDay: true,
            };
        });

        setList(_list);
    };

    const onSelectEvent = (evt) => {
        setOpen((o) => !o);
        console.log(evt);
        onToggleModal(false);
        router.visit(`/campanas/edit/${evt.id}`);
    };

    const onSetItem = (_id) => {
        setId(_id);
        onToggleModal(true);
    };

    const onToggleModal = (isShown) => {
        if (!isShown) {
            setId(null);
        }
        setShow(isShown);
    };

    const onReload = () => {
        onToggleModal(false);
        router.visit(window.location.pathname);
    };

    const onCreate = () => {
        onToggleModal(false);
        router.visit(`/campanas/create`);
    };

    const goToLista = () => {
        onToggleModal(false);
        router.visit(`/campanas/lista`);
    }

    useEffect(() => {
        onSetList();
    }, []);

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
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-6 mt-6">
                        <div className="flex justify-around">
                            <div
                                className={`cursor-pointer items-center font-bold underline`}
                            >
                                Calendario
                            </div>

                            <div
                                className={`cursor-pointer items-center font-bold`}
                                onClick={() => goToLista()}
                            >
                                Lista
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4 mb-4">
                        <PrimaryButton className="ms-4" onClick={onCreate}>
                            Agregar
                        </PrimaryButton>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <Calendar
                            defaultDate={new Date()}
                            localizer={localizer}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: "65vh" }}
                            messages={messages}
                            events={list}
                            onSelectEvent={onSelectEvent}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
