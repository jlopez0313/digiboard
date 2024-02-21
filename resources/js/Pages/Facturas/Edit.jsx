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
import { Form } from "./Detalle/Form";
import InputLabel from "@/Components/Form/InputLabel";
import TextInput from "@/Components/Form/TextInput";

export default ({ auth, factura }) => {

    const [show, setShow] = useState(false);
    const [list, setList] = useState([]);
    const [sum, setSum] = useState(0);

    const data = factura.detalles;

    const titles = [
        "Artículo",
        "Referencia",
        "Color",
        "Medida",
        "Cantidad",
        "Precio Venta",
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
                articulo: item.producto.inventario.articulo,
                referenia: item.producto.referencia,
                color: item.producto.color.color,
                medida: item.producto.medida.medida,
                cantidad: item.cantidad,
                precio: item.precio_venta,
            };
        });

        setList(_list);
    };

    const onSetSum = () => {
        const sum = data.reduce( (sum, item) => {
            return sum + item.precio_venta;
        }, 0);

        setSum( sum )
    }

    const onSetItem = (_id) => {
        setId(_id)
        onToggleModal(true)
    }

    useEffect(() => {
        onSetList();
        onSetSum();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editar Órden de Compra
                </h2>
            }
        >
            <Head title="Órden de Compra" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Documento" />

                                <TextInput
                                    type="text"
                                    value={factura.id}
                                    className="mt-1 block w-full"
                                    readOnly={true}
                                />
                            </div>
                            
                            <div>
                                <InputLabel value="Cliente" />

                                <TextInput
                                    type="text"
                                    value={factura.cliente.nombre}
                                    className="mt-1 block w-full"
                                    readOnly={true}
                                />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="fecha" value="Fecha" />

                                <TextInput
                                    type="text"
                                    value={factura.created_at}
                                    className="mt-1 block w-full"
                                    readOnly={true}
                                />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="ciudad" value="Valor Total" />
                                
                                <TextInput
                                    type="text"
                                    value={sum}
                                    className="mt-1 block w-full"
                                    readOnly={true}
                                />
                            </div>
                            
                        </div>
                    </form>
                </div>



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
                            links={[]}
                            onEdit={ onSetItem }
                            titles={titles}
                            actions={[]}
                        />
                    </div>
                </div>
            </div>
            

            <Modal show={show} closeable={true} title="Agregar Producto">
                <Form
                    factura={factura}
                    setIsOpen={onToggleModal}        
                    onReload={onReload}
                    id={id}
                />
            </Modal>
        </AuthenticatedLayout>
    );
};
