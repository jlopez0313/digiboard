import React, { useEffect, useState } from "react";

import EmptyLayout from "@/Layouts/EmptyLayout";
import { Head } from "@inertiajs/react";
import { Carousel } from "@material-tailwind/react";
import { AdminModal } from "@/Components/AdminModal";

export default ({ auth, cartelera }) => {

    const [show, setShow] = useState( false )
    const [adminModal, setAdminModal] = useState(false);

    const onSetAdminModal = () => {
        setAdminModal(true);
    };

    const onConfirm = async ({ data: {data} }) => {
        if( data ) {
            setAdminModal(false);
            setShow(true);
        }
    };

    useEffect( () => {
        onSetAdminModal()
    }, [])

    return (
        <>
        {
            show ? 
                <EmptyLayout
                    user={auth.user}
                    header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Carteleras
                        </h2>
                    }
                >
                    <Head title="Carteleras" />

                    <Carousel className="rounded-xl h-[800px]" 
                        loop={true}
                        autoplay={true}
                        autoplayDelay={ 12500 }
                    >
                        {
                            cartelera.multimedias.map( (foto, key) => {
                                return <div key={key} className="h-full w-100 sm:h-44 md:h-full flex-shrink-0 flex items-center justify-center" >
                                    {
                                        foto.mimetype.includes('image') ? 
                                            <img className="object-fill h-full w-auto rounded-md" src={'/' + foto.src} alt=''/>
                                            : 
                                            <video className="object-fill h-full w-auto rounded-md" alt='' controls autoPlay={ false }>
                                                <source src={'/' + foto.src}></source>
                                            </video>
                                    }
                                </div>
                            })
                        }
                    </Carousel>

                    <marquee className='my-5'> { cartelera.marquesina } </marquee>

                </EmptyLayout>
            : null
        }

        <AdminModal
            title={'Ingresar Código'}
            show={adminModal}
            setIsOpen={setAdminModal}
            onConfirm={onConfirm}
            url={`/api/v1/carteleras/codigo/${cartelera.id}`}
        ></AdminModal>

        </>
    );
}
