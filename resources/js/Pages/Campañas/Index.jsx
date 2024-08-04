import React, { useEffect, useState } from "react";
// import Layout from '@/Components/Layout';
import Icon from "@/Components/Icon";
// import SearchFilter from '@/Shared/SearchFilter';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import Modal from "@/Components/Modal";
import { Form } from "./Form";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar'

import moment from "moment";
import 'moment/locale/es.js';
// moment.locale('es');

const localizer = momentLocalizer(moment)

const messages = {
    allDay: "Todos los días",
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
    noEventsInRange: "No hay eventos en este rango."
};

export default ({ auth, contacts, usuarios }) => {
    const {
        data,
    } = contacts;

    const {
        data: users,
    } = usuarios;

    const [list, setList] = useState([]);
    const [id, setId] = useState(null);
    const [show, setShow] = useState(false);

    const onSetList = () => {
        const _list = data.map((item) => {
            return {
                id: item.id,
                diseno: item.diseno?.diseno || "",
                fecha_inicial: item.fecha_inicial,
                fecha_final: item.fecha_final,
            };
        });

        setList(_list);
    };

    const onSetItem = (_id) => {
        setId(_id);
        onToggleModal(true);
    };

    const onTrash = async (_id) => {
        if (data) {
            await axios.delete(`/api/v1/carteleras/${_id}`);
            onReload();
        }
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
                    <div className="flex items-center justify-end mt-4 mb-4">
                        <PrimaryButton
                            className="ms-4"
                            onClick={() => onToggleModal(true)}
                        >
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
                        />
                    </div>
¿
                </div>
            </div>
            <Modal show={show} closeable={true} title="Gestionar Campaña">
                <Form setIsOpen={onToggleModal} onReload={onReload} id={id} users={users} />
            </Modal>
        </AuthenticatedLayout>
    );
};
