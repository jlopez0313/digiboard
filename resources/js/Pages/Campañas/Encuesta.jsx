import React, { useEffect, useState } from "react";
// import Layout from '@/Components/Layout';
// import SearchFilter from '@/Shared/SearchFilter';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

export default ({ auth, contacts }) => {
    const { data } = contacts;
    
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    const onChart = async () => {

        const result = Object.groupBy(data.evaluaciones, ({ respuesta }) => respuesta);
        const values = Object.values(result)
        const answers = []

        Object.keys(result).forEach(key => {
            answers.push( data.tipo_respuestas.find( x => x.id == key )?.respuesta )
        })

        setChartData({
            labels: answers,
            datasets: [
                {
                    label: "Respuestas ",
                    data: values.map((total) => total.length),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1,
                },
            ],
        })
    };

    const onReload = () => {
        router.visit("/campanas/lista");
    };

    useEffect(() => {
        onChart();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Campañas
                </h2>
            }
        >
            <Head title="Campañas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end mb-4">
                        <SecondaryButton className="ms-4" onClick={onReload}>
                            Regresar
                        </SecondaryButton>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <Bar
                            data={chartData}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: data.encuesta,
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
