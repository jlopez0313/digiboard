import React, { useEffect, useState } from "react";
// import Layout from '@/Components/Layout';
import Icon from "@/Components/Icon";
// import SearchFilter from '@/Shared/SearchFilter';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Pagination from "@/Components/Table/Pagination";
import Table from "@/Components/Table/Table";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import Modal from "@/Components/Modal";
import { Form } from "./Form";

export default ({ auth, contacts, tipoClientes, departamentos }) => {

    const {
        data,
        meta: { links },
    } = contacts;

    const titles = [
        "Documento",
        "Nombre",
        "Departamento",
        "Ciudad",
        "Dirección",
        "Celular",
        "Tipo",
    ];

    const [id, setId] = useState(null);
    const [list, setList] = useState([]);
    const [show, setShow] = useState(false);

    const onSetList = () => {
        const _list = data.map((item) => {
            return {
                id: item.id,
                documento: item.documento,
                nombre: item.nombre,
                departamento: item.ciudad?.departamento?.departamento || "",
                ciudad: item.ciudad?.ciudad || "",
                direccion: item.direccion,
                celular: item.celular,
                tipo: item.tipo?.tipo,
            };
        });

        setList(_list);
    };

    const onSetItem = (_id) => {
        setId(_id)
        onToggleModal(true)
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
                    Clientes
                </h2>
            }
        >
            <Head title="Clientes" />

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

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table
                            data={list}
                            links={links}
                            onEdit={ onSetItem }
                            titles={titles}
                            actions={["edit", "trash"]}
                        />
                    </div>

                    <Pagination links={links} />
                </div>
            </div>

            <Modal show={show} closeable={true} title="Crear Cliente">
                <Form
                    departamentos={departamentos}
                    tipoClientes={tipoClientes}
                    setIsOpen={onToggleModal}        
                    onReload={onReload}
                    id={id}
                />
            </Modal>
        </AuthenticatedLayout>
    );
};
