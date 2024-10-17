import ApplicationLogo from "@/Components/ApplicationLogo";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import React from "react";
import styles from "./Form.module.css";
import InputLabel from "@/Components/Form/InputLabel";
import TextInput from "@/Components/Form/TextInput";
import { useForm } from "@inertiajs/react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'sweetalert2/src/sweetalert2.scss'

export default ({ campana }) => {
    const { data: my_data } = campana;

    const { data, setData, processing, errors, reset } = useForm({
        campanas_id: my_data.id,
        respuesta: "",
    });

    const submit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`/api/v1/evaluaciones`, data);
            showSwal();
        } catch (e) {
            console.log(e);
        }
    };

    const showSwal = () => {
        withReactContent(Swal)
        .fire({
            title: 'Gracias!',
            text: 'Su respuesta ha sido registrada',
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: {
                confirmButton: `${styles['btn-success']}`,
            },
        });
    };

    return (
        <div
            className={`mt-5 text-2xl px-10 py-5 rounded-xl max-w-4xl mx-auto my-auto bg-black ${styles.evaluacion}`}
        >
            {/*
                <ApplicationLogo className="mx-auto mb-8" />
            */}

            <p className="text-white mb-3">{my_data.encuesta}</p>

            <form onSubmit={submit}>
                <ul className="text-white">
                    {my_data.tipo_respuestas.map((item, idx) => {
                        return (
                            <li key={idx} className="mb-3">
                                <TextInput
                                    id="respuesta"
                                    type="radio"
                                    name="respuesta"
                                    value={item.id}
                                    autoComplete="respuesta"
                                    onChange={(e) =>
                                        setData("respuesta", e.target.value)
                                    }
                                />

                                <InputLabel
                                    htmlFor=""
                                    className=" ms-3 inline text-white"
                                    value={item.respuesta}
                                />
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4 mx-4" disabled={processing}>
                        {" "}
                        Enviar{" "}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};
