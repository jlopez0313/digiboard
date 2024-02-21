import React, { useEffect, useState } from "react";
// import Layout from '@/Components/Layout';
import Icon from "@/Components/Icon";
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

    const titles= [
        'Ord. Compra',
        'Valor Total',
        'Saldo',
        'Fecha de Creación',
    ]

    const [list, setList] = useState([]);
    
    const onSetList = () => {
        const _list = data.map( item => {
            return {
                'id': item.id,
                'Ord. Compra': item.id,
                'valor': item.valor,
                'saldo': item.valor - item.cobros,
                'fecha': item.created_at,
            }
        })

        setList( _list );
    }

    const onSearch = (id) => {
        router.get( `recaudos/edit/${ id }` )
    }

    useEffect(()=> {
        onSetList()
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Recaudos
                </h2>
            }
        >
            <Head title="Recaudos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table 
                            data={list}
                            links={links}
                            onSearch={onSearch}
                            actions={["search"]}
                            titles={titles} />
                    </div>

                    <Pagination links={links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
