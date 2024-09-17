import Icon from "../Icons/Index";

export default ({ action, ...props }) => {
    return (
        <>
            {action === "test" && (
                <a
                    tabIndex="-1"
                    {...props}
                    className="px-4 focus:outline-none inline-block"
                    role="button"
                    title="Evaluación"
                >
                    <Icon
                        name="test"
                        className="block w-6 h-6 text-gray-400 fill-current"
                    />
                </a>
            )}

            {action === "survey" && (
                <a
                    tabIndex="-1"
                    {...props}
                    className="px-4 focus:outline-none inline-block"
                    role="button"
                    title="Encuesta"
                >
                    <Icon
                        name="survey"
                        className="block w-6 h-6 text-gray-400 fill-current"
                    />
                </a>
            )}

            {action === "edit" && (
                <a
                    tabIndex="-1"
                    {...props}
                    className="px-4 focus:outline-none inline-block"
                    role="button"
                    title="Editar"
                >
                    <Icon
                        name="edit"
                        className="block w-6 h-6 text-gray-400 fill-current"
                    />
                </a>
            )}

            {action === "trash" && (
                <a
                    tabIndex="-1"
                    {...props}
                    className="px-4 focus:outline-none inline-block"
                    role="button"
                    title="Eliminar"
                >
                    <Icon
                        name="trash"
                        className="block w-6 h-6 text-gray-400 fill-current"
                    />
                </a>
            )}

            {action === "chevron-right" && (
                <a
                    tabIndex="-1"
                    className="px-4 focus:outline-none inline-block"
                >
                    <Icon
                        name="chevron-right"
                        className="block w-6 h-6 text-gray-400 fill-current"
                    />
                </a>
            )}

            {action === "search" && (
                <a
                    tabIndex="-1"
                    {...props}
                    className="px-4 focus:outline-none inline-block"
                    role="button"
                    title="Detalle"
                >
                    <Icon
                        name="search"
                        className="block w-6 h-6 text-gray-400 fill-current"
                    />
                </a>
            )}

            {action === "cog" && (
                <a
                    tabIndex="-1"
                    {...props}
                    className="px-4 focus:outline-none inline-block"
                    role="button"
                    title="Configurar"
                >
                    <Icon
                        name="cog"
                        className="block w-6 h-6 text-gray-400 fill-current"
                    />
                </a>
            )}
        </>
    );
};
