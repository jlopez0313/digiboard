import React, { useEffect, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Table/Pagination";
import Table from "@/Components/Table/Table";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import Modal from "@/Components/Modal";
import { Assign } from "./Assign";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";

export default ({ auth, id, contacts, empresas }) => {

    const {
        data,
        meta: { links },
    } = contacts;

    const titles= [
        'Empresa',
        'Area',
        'Pantalla',
        'Cartelera',
        'Código',
        'Estado',
    ]

    const [list, setList] = useState([]);
    const [show, setShow] = useState(false);
    
    const onSetList = () => {

        const _list = data.map( item => {
            return {
                'id': item.id,
                'empresa': item.pantalla?.area?.empresa?.empresa,
                'area': item.pantalla?.area?.area,
                'pantalla': item.pantalla?.pantalla,
                'cartelera': item.cartelera?.id || '',
                'code': item.code || '',
                'estado': item.estado_label,
            }
        })

        setList( _list );
    }

    const onTrash = async (_id) => {
        if ( data ) {
            await axios.delete(`/api/v1/carteleras/desasignar/${_id}`);
            onReload()
        }
    }

    const onToggleModal = (isShown) => {
        setShow(isShown);
    };

    const onReload = () => {
        onToggleModal(false);
        router.visit(window.location.pathname);
    }

    const onBack = () => {
        router.get('/usuarios');
    }

    useEffect(()=> {
        onSetList()
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pantallas con Carteleras
                </h2>
            }
        >
            <Head title="Pantallas con Carteleras" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end mt-4 mb-4">
                        <SecondaryButton
                            className="ms-4"
                            onClick={() => onBack()}
                        >
                            Atrás
                        </SecondaryButton>

                        <PrimaryButton
                            className="ms-4"
                            onClick={() => onToggleModal(true)}
                        >
                            Asignar
                        </PrimaryButton>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table 
                            data={list}
                            links={links}
                            onTrash={ onTrash }
                            titles={titles}
                            actions={['trash']}
                        />
                    </div>

                    <Pagination links={links} />
                </div>
            </div>
            <Modal show={show} closeable={true} title="Asignar Carteleras">
                <Assign
                    empresas={empresas}
                    setIsOpen={onToggleModal}        
                    onReload={onReload}
                    id={id}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
