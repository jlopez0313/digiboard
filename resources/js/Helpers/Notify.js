import { toast } from "react-toastify";

export const notify = (type, message, newOptions = {}) => {
    const options = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        ...newOptions,
    };

    switch (type) {
        case "info":
            toast.info(message, options);
            break;
        case "success":
            toast.success(message, options);
            break;
        case "warning":
            toast.warn(message, options);
            break;
        case "error":
            toast.error(message, options);
            break;
        default:
            break;
    }
};
