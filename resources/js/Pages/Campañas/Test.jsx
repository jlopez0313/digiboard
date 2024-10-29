import React, { useEffect, useState } from "react";
// import Layout from '@/Components/Layout';
// import SearchFilter from '@/Shared/SearchFilter';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import InputLabel from "@/Components/Form/InputLabel";
import TextInput from "@/Components/Form/TextInput";
import InputError from "@/Components/Form/InputError";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import TextSpan from "@/Components/Form/TextSpan";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(CategoryScale);

export default ({ auth, contacts }) => {
    const { data: campaña } = contacts;

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        rotation: -90,
        circumference: 180,
        cutout: "60%",
        maintainAspectRatio: true,
        responsive: true,
    };

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    const [total, setTotal] = useState(0);

    const { data, setData, processing, errors, reset } = useForm({
        logro_alcanzado: campaña.logro_alcanzado || '-',
        observacion: campaña.observacion || '-',
    });

    const onReload = () => {
        router.visit("/campanas/lista");
    };

    const onChart = async () => {
        
        const _total = (
            (campaña.logro_alcanzado / campaña.logro_esperado) *
            100
        ).toFixed(2);

        setTotal(_total);

        let valores = []
        let colors = []

        if ( Number(_total) <= Number(campaña.valor_max_malo) ) {
            valores = [16, 1, 16, 33, 33]

            colors = [
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0.6)",
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0)",
            ]
        } else if ( Number(_total) >= Number(campaña.valor_min_regular) && Number(_total) < Number(campaña.valor_min_bueno) ) {
            valores = [33, 16, 1, 16, 33]

            colors = [
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0.6)",
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0)",
            ]
        } else {
            valores = [33, 33, 16, 1, 16]

            colors = [
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0.6)",
                "rgba(0, 0, 0, 0)",
            ]
        }

        setChartData({
            labels: ["red", "yellow", "green"],
            datasets: [
                {
                    data: [33.33, 33.33, 33.33],
                    backgroundColor: [
                        "rgb(255, 69, 96)",
                        "rgb(206, 148, 73)",
                        "rgb(153, 223, 89)",
                    ],
                    hoverBackgroundColor: [
                        "rgb(255, 69, 96)",
                        "rgb(206, 148, 73)",
                        "rgb(153, 223, 89)",
                    ],
                },
                {
                    data: valores,
                    backgroundColor: colors ,
                    borderWidth: 0,
                },
            ],
        });
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/v1/campanas/evaluar/${campaña.id}`, data);
            onReload();
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        campaña.logro_alcanzado && onChart();
    }, [campaña]);

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

                    <form onSubmit={submit}>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                    KPI
                                </h2>

                                <div className="mt-5 grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="descripcion_kpi"
                                            value="Descripción KPI"
                                        />

                                        <TextSpan
                                            value={campaña.descripcion_kpi}
                                            className="mt-1 block w-full"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="logro_esperado"
                                            value="Logro Esperado"
                                        />

                                        <TextSpan
                                            value={campaña.logro_esperado}
                                            className="mt-1 block w-full"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="logro_alcanzado"
                                            value="Logro Alcanzado"
                                        />

                                        <TextInput
                                            id="logro_alcanzado"
                                            name="logro_alcanzado"
                                            type="number"
                                            min="0"
                                            value={data.logro_alcanzado}
                                            className="mt-1 block w-full"
                                            autoComplete="logro_alcanzado"
                                            onChange={(e) =>
                                                setData(
                                                    "logro_alcanzado",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.logro_alcanzado}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="observacion"
                                            value="Observación"
                                        />

                                        <TextArea
                                            id="observacion"
                                            name="observacion"
                                            value={data.observacion}
                                            className="mt-1 block w-full"
                                            autoComplete="observacion"
                                            onChange={(e) =>
                                                setData(
                                                    "observacion",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.observacion}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <h2 className="mt-5 font-semibold text-xl text-gray-800 leading-tight">
                                    Criterios
                                </h2>
                                <div className="mt-5 grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="valor_malo"
                                            value="% Malo"
                                        />

                                        <TextSpan
                                            value={`${campaña.valor_min_malo}% - ${campaña.valor_max_malo}%`}
                                            className="mt-1 block w-full"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="valor_regular"
                                            value="% Regular"
                                        />

                                        <TextSpan
                                            value={`${campaña.valor_min_regular}% - ${campaña.valor_max_regular}%`}
                                            className="mt-1 block w-full"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="valor_bueno"
                                            value="% Bueno"
                                        />

                                        <TextSpan
                                            value={`${campaña.valor_min_bueno}% - ${campaña.valor_max_bueno}%`}
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                </div>

                                {campaña.logro_alcanzado && (
                                    <div className="mt-5 flex justify-center relative">
                                        <div style={{ width: "200px" }}>
                                            <Doughnut
                                                width={200}
                                                height={200}
                                                data={chartData}
                                                options={options}
                                            />

                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: "25%",
                                                    left: "50%",
                                                    transform:
                                                        "translate(-50%, -50%)",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <div>{total}%</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {!campaña.logro_alcanzado && (
                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    className="ms-4 mx-4"
                                    disabled={
                                        processing || !data.logro_alcanzado
                                    }
                                >
                                    {" "}
                                    Guardar{" "}
                                </PrimaryButton>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
