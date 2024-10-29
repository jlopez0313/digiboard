import React, { useEffect, useState } from "react";
// import Layout from '@/Components/Layout';
// import SearchFilter from '@/Shared/SearchFilter';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Pagination from "@/Components/Table/Pagination";
import Table from "@/Components/Table/Table";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import Modal from "@/Components/Modal";

export default ({ auth, contacts }) => {

    const {
        data,
    } = contacts;

    const titles = [
        'ID',
        "Departamento",
        "Ciudad",
        "Area",
        "Pantalla",
        "Cartelera",
        "Estado",
        "Ultima Actualización",
    ];

    const [id, setId] = useState(null);
    const [list, setList] = useState([]);
    const [show, setShow] = useState(false);

    const onSetList = () => {
        const _list = data.map((item) => {
            return {
                id: item.id,
                depto: item.area?.ciudad?.departamento?.departamento || '-',
                ciudad: item.area?.ciudad?.ciudad || '-',
                area: item.area?.area || '-',
                pantalla: item.pantalla,
                cartelera: item.cartelera?.id || <i>-Sin Asignar-</i>,
                estado: item.estado == 'A' ? 
                    <div title='Online' className={'rounded-full size-4 bg-lime-500'}></div> : 
                    <div title='Offline' className={'rounded-full size-4 bg-red-500'}></div>,
                fecha: item.updated_at,
            };
        });

        setList(_list);
    };

    const onSetItem = (_id) => {
        setId(_id)
        onToggleModal(true)
    }

    const onTrash = async (_id) => {
        if ( data ) {
            await axios.delete(`/api/v1/empresas/${_id}`);
            onReload()
        }
    }

    const onToggleModal = (isShown) => {
        if ( !isShown ) {
            setId(null)
        }
        setShow(isShown);
    };

    const onReload = () => {
        onToggleModal(false);

        router.visit(window.location.pathname);
    }

    useEffect(() => {
        onSetList();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="flex items-center justify-end mt-4 mb-4">
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table
                            data={list}
                            onEdit={ () => {} }
                            onTrash={ () => {} }
                            titles={titles}
                            actions={[]}
                        />
                    </div>

                    
                </div>
            </div>

        </AuthenticatedLayout>
    );
};
