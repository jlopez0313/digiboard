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
import { Form } from "./Productos/Form";

export default ({ auth, inventario, contacts, colores, medidas }) => {

    const [show, setShow] = useState(false);
    const [list, setList] = useState([]);

    const {
        data,
        meta: { links },
    } = contacts;

    const {
        data: coloresLst,
    } = colores;

    const {
        data: medidasLst,
    } = medidas;

    const titles = [
        "Artículo",
        "Referencia",
        "Color",
        "Medida",
        "Cantidad",
        "Precio Costo",
    ];

    const [id, setId] = useState(null);

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

    const onSetList = () => {
        const _list = data.map((item) => {
            return {
                id: item.id,
                articulo: item.inventario.articulo,
                referenia: item.referencia,
                color: item.color.color,
                medida: item.medida.medida,
                cantidad: item.cantidad,
                precio: item.precio,
            };
        });

        setList(_list);
    };

    const onSetItem = (_id) => {
        setId(_id)
        onToggleModal(true)
    }

    useEffect(() => {
        onSetList();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editar Inventario
                </h2>
            }
        >
            <Head title="Inventario" />

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
                </div>
            </div>
            

            <Modal show={show} closeable={true} title="Crear Producto">
                <Form
                    inventario={inventario}
                    colores={coloresLst}
                    medidas={medidasLst}
                    setIsOpen={onToggleModal}        
                    onReload={onReload}
                    id={id}
                />
            </Modal>
        </AuthenticatedLayout>
    );
};
