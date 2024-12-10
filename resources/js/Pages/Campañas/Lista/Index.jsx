import React, { useEffect, useState } from "react";
// import Layout from '@/Components/Layout';
// import SearchFilter from '@/Shared/SearchFilter';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Table/Pagination";
import Table from "@/Components/Table/Table";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

export default ({ auth, contacts }) => {
    const {
        data,
        meta: { links },
    } = contacts;

    const titles = [
        "ID",
        "Campaña",
        "Eje",
        "Fecha Inicial",
        "Fecha Final",
        "KPI",
        "Codigo",
    ];

    const [list, setList] = useState([]);
    const [id, setId] = useState(null);
    const [show, setShow] = useState(false);

    const onSetList = () => {
        const _list = data.map((item) => {

            return {
                id: item.id,
                diseno: item.nombre,
                campana: item.eje,
                fecha_inicial: item.cartelera?.fecha_inicial,
                fecha_final: item.cartelera?.fecha_final,
                kpi: item.logro_alcanzado
                    ? (
                          (item.logro_alcanzado / item.logro_esperado) *
                          100
                      ).toFixed(2) + '%'
                    : "-",
                codigo: item.cartelera?.pantallas ? item.cartelera?.pantallas[0]?.pantalla?.code : '-'
            };
        });

        setList(_list);
    };

    const onTrash = async (_id) => {
        if (data) {
            await axios.delete(`/api/v1/campanas/${_id}`);
            onReload();
        }
    };

    const onSearch = (id) => {
        const campaña = data.find(x => x.id == id)
        const item = campaña?.cartelera?.pantallas[0] || null;

        if ( item ) {
            window.open(`/asignacion/${item.pantallas_id}`, '_blank', 'noopener,noreferrer');
        }
    }

    const onCreate = () => {
        onToggleModal(false);
        router.visit(`/campanas/create`);
    };

    const onSurvey = async (_id) => {
        router.visit(`/campanas/encuesta/${_id}`);
    };

    const onTest = async (_id) => {
        router.visit(`/campanas/test/${_id}`);
    };

    const onEdit = async (_id) => {
        router.visit(`/campanas/edit/${_id}`);
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

    const goToCalendario = () => {
        onToggleModal(false);
        router.visit(`/campanas`);
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
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-6 mt-6">
                        <div className="flex justify-around">
                            <div
                                className={`cursor-pointer items-center font-bold`}
                                onClick={() => goToCalendario()}
                            >
                                Calendario
                            </div>

                            <div
                                className={`cursor-pointer items-center font-bold underline`}
                            >
                                Lista
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4 mb-4">
                        <PrimaryButton
                            className="ms-4"
                            onClick={() => onCreate()}
                        >
                            Agregar
                        </PrimaryButton>
                    </div>

                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg">
                        <Table
                            data={list}
                            links={links}
                            onSearch={onSearch}
                            onSurvey={onSurvey}
                            onTest={onTest}
                            onCreate={onCreate}
                            onEdit={onEdit}
                            onTrash={onTrash}
                            titles={titles}
                            actions={[
                                "search",
                                "survey",
                                "test",
                                "edit",
                                "trash",
                            ]}
                        />
                    </div>

                    <Pagination links={links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
