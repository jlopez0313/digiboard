import Table from '@/Components/Table/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Dashboard({ auth }) {

    const titles = [
        'Código',
        'Parámetro',
        'Descripción',
    ]

    const list = [
        {
            id: 1,
            parametro: 'Departamentos',
            descripcion: 'Gestionar Departamentos',
            ruta: 'parametros/departamentos'
        },
        {
            id: 2,
            parametro: 'Ciudades',   
            descripcion: 'Gestionar Ciudades',
            ruta: 'parametros/ciudades'
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
