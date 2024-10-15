
import React, { useEffect, useState } from "react";
import TenantLayout from '@/Layouts/TenantLayout';
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Table/Pagination";
import Table from "@/Components/Table/Table";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import Modal from "@/Components/Modal";
import { Form } from "./Form";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";

export default ({ auth, tenants }) => {
    const {
        data,
        meta: { links },
    } = tenants;

    const titles= [
        'ID',
        'Tenant',
        'Dominio',
        'Fecha de Creación'
    ]

    const [action, setAction] = useState( '' );
    const [list, setList] = useState([]);
    const [id, setId] = useState(null);
    const [show, setShow] = useState(false);
    
    const onSetList = () => {
        const _list = data.map( item => {
            return {
                'id': item.id,
                'tenant': item.id,
                'domain': item.domain?.domain,
                'fecha': item.created_at,
                
            }
        })

        setList( _list );
    }

    const onConfirm = async ({ data }) => {
        if ( action == 'edit' ) {
            onToggleModal( true )
        } else {
            onTrash(data)
        }
    }

    const onTrash = async (data) => {
        if ( data ) {
            await axios.delete(`/api/v1/tenants/${id}`);
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

    const onBack = () => {
        history.back();
    }

    useEffect(()=> {
        onSetList()
    }, [])

    return (
        <TenantLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tenants
                </h2>
            }
        >
            <Head title="Tenants" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end mt-4 mb-4">
                        {/* 
                            <SecondaryButton
                                className="ms-4"
                                onClick={() => onBack()}
                            >
                                Atras
                            </SecondaryButton>
                        */}
                        
                        <PrimaryButton
                            className="ms-4"
                            onClick={() => onToggleModal(true)}
                        >
                            Agregar
                        </PrimaryButton>
                    </div>

                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg">
                        <Table 
                            data={list}
                            links={links}
                            onEdit={ (evt) => {} }
                            onTrash={ onTrash }
                            titles={titles}
                            actions={['trash']}
                        />
                    </div>

                    <Pagination links={links} />
                </div>
            </div>
            <Modal show={show} closeable={true} title="Crear Tenant">
                <Form
                    setIsOpen={onToggleModal}        
                    onReload={onReload}
                    id={id}
                />
            </Modal>

        </TenantLayout>
    );
}

