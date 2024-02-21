import Table from '@/Components/Table/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Dashboard({ auth }) {

    const titles = [
        'Parámetro',
        'Descripción',
    ]

    const list = [
        {
            id: 1,
            parametro: 'Tipos de Cliente',   
            descripcion: 'Gestionar Tipos de Cliente',
            ruta: 'parametros/tipos_clientes'
        },
        {
            id: 2,
            parametro: 'Conceptos',   
            descripcion: 'Gestionar Conceptos',
            ruta: 'parametros/conceptos'
        },
        {
            id: 3,
            parametro: 'Bancos',   
            descripcion: 'Gestionar Bancos',
            ruta: 'parametros/bancos'
        },
        {
            id: 4,
            parametro: 'Medidas',   
            descripcion: 'Gestionar Medidas',
            ruta: 'parametros/medidas'
        },
        {
            id: 5,
            parametro: 'Colores',   
            descripcion: 'Gestionar Colores',
            ruta: 'parametros/colores'
        },
    ]

    const onNavigate = (id) => {
        const route = list.find( item => item.id === id )
        router.get( route.ruta )
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Parámetros</h2>}
        >
            <Head title="Parámetros" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table data={list} titles={titles} actions={['chevron-right']} onEdit={ onNavigate } />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
