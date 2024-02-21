import React, { useEffect, useState } from "react";
// import Layout from '@/Components/Layout';
import Icon from "@/Components/Icon";
// import SearchFilter from '@/Shared/SearchFilter';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Table/Pagination";
import Table from "@/Components/Table/Table";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import Modal from "@/Components/Modal";
import { Form } from "./Form";

export default ({ auth, tipoClientes, contacts, departments, payments }) => {

    const {
        data: departamentos,
    } = departments;
    
    const {
        data,
        meta: { links },
    } = contacts;

    const titles= [
        'Fecha de Creación',
        'Código',
        'Cliente',
        'Forma de Pago'
    ]

    const [id, setId] = useState(null);
    const [list, setList] = useState([]);
    const [show, setShow] = useState(false);
    
    const onSetList = () => {
        const _list = data.map( item => {
            return {
                'id': item.id,
                'fecha': item.created_at,
                'codigo': item.id,
                'cliente': item.cliente?.nombre || '',
                'payment': item.forma_pago || ''
            }
        })

        setList( _list );
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

    const onEdit = (id) => {
        router.get( `remisiones/edit/${ id }` )
    }

    useEffect(()=> {
        onSetList()
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Órdenes de Compra
                </h2>
            }
        >
            <Head title="Órdenes de Compra" />

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
                            onEdit={ onEdit }
                            titles={titles}
                            actions={["edit", "trash"]}
                        />
                    </div>

                    <Pagination links={links} />
                </div>
            </div>

            <Modal show={show} closeable={true} title="Registrar Órden">
                <Form
                    departamentos={departamentos}
                    medidas={[]}
                    origenes={[]}
                    tipoClientes={tipoClientes}
                    payments={payments}
                    setIsOpen={onToggleModal}        
                    onReload={onReload}
                    id={id}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
