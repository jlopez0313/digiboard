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

export default ({ auth, contacts, empresas, departamentos }) => {

    const {
        data,
        meta: { links },
    } = contacts;

    const titles= [
        'Departamento',
        'Ciudad',
        'Empresa',
        'Area',
        'Dirección',
    ]

    const [list, setList] = useState([]);
    const [id, setId] = useState(null);
    const [show, setShow] = useState(false);
    
    const onSetList = () => {
        const _list = data.map( item => {
            return {
                id: item.id,
                departamento: item.ciudad?.departamento?.departamento || '',
                ciudad: item.ciudad?.ciudad || '',
                empresa: item.empresa?.empresa || '',
                area: item.area,
                direccion: item.direccion,
            }
        })

        setList( _list );
    }

    const onSetItem = (_id) => {
        setId(_id)
        onToggleModal(true)
    }

    const onTrash = async (_id) => {
        if ( data ) {
            await axios.delete(`/api/v1/areas/${_id}`);
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

    useEffect(()=> {
        onSetList()
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Areas
                </h2>
            }
        >
            <Head title="Areas" />

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
                            onTrash={ onTrash }
                            titles={titles}
                            actions={['edit', 'trash']}
                        />
                    </div>

                    <Pagination links={links} />
                </div>
            </div>
            <Modal show={show} closeable={true} title="Gestionar Area">
                <Form
                    empresas={ empresas }
                    departamentos={ departamentos }
                    setIsOpen={onToggleModal}        
                    onReload={onReload}
                    id={id}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
