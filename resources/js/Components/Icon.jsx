import React from "react";

export default ({ name, className, fill = "", ...props }) => {
    if (name === "apple") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                {...props}
            >
                <g fillRule="nonzero">
                    <path d="M46.173 19.967C49.927-1.838 19.797-.233 14.538.21c-.429.035-.648.4-.483.8 2.004 4.825 14.168 31.66 32.118 18.957zm13.18 1.636c1.269-.891 1.35-1.614.047-2.453l-2.657-1.71c-.94-.607-1.685-.606-2.532.129-5.094 4.42-7.336 9.18-8.211 15.24 1.597.682 3.55.79 5.265.328 1.298-4.283 3.64-8.412 8.088-11.534z" />
                    <path d="M88.588 67.75c9.65-27.532-13.697-45.537-35.453-32.322-1.84 1.118-4.601 1.118-6.441 0-21.757-13.215-45.105 4.79-35.454 32.321 5.302 15.123 17.06 39.95 37.295 29.995.772-.38 1.986-.38 2.758 0 20.235 9.955 31.991-14.872 37.295-29.995z" />
                </g>
            </svg>
        );
    }

    if (name === "book") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                {...props}
            >
                <path d="M6 4H5a1 1 0 1 1 0-2h11V1a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-7v8l-2-2-2 2V4z" />
            </svg>
        );
    }

    if (name === "chevron-down") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                {...props}
            >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
        );
    }

    if (name === "chevron-right") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                {...props}
            >
                <polygon points="12.95 10.707 13.657 10 8 4.343 6.586 5.757 10.828 10 6.586 14.243 8 15.657 12.95 10.707" />
            </svg>
        );
    }

    if (name === "dashboard") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                {...props}
            >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z" />
            </svg>
        );
    }

    if (name === "location") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                {...props}
            >
                <path d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
        );
    }

    if (name === "office") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                {...props}
            >
                <path
                    fillRule="evenodd"
                    d="M7 0h86v100H57.108V88.418H42.892V100H7V0zm9 64h11v15H16V64zm57 0h11v15H73V64zm-19 0h11v15H54V64zm-19 0h11v15H35V64zM16 37h11v15H16V37zm57 0h11v15H73V37zm-19 0h11v15H54V37zm-19 0h11v15H35V37zM16 11h11v15H16V11zm57 0h11v15H73V11zm-19 0h11v15H54V11zm-19 0h11v15H35V11z"
                />
            </svg>
        );
    }

    if (name == "printer") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                {...props}
            >
                <path d="M4 16H0V6h20v10h-4v4H4v-4zm2-4v6h8v-6H6zM4 0h12v5H4V0zM2 8v2h2V8H2zm4 0v2h2V8H6z" />
            </svg>
        );
    }

    if (name === "shopping-cart") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                {...props}
            >
                <path d="M4 2h16l-3 9H4a1 1 0 1 0 0 2h13v2H4a3 3 0 0 1 0-6h.33L3 5 2 2H0V0h3a1 1 0 0 1 1 1v1zm1 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
        );
    }

    if (name === "store-front") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                {...props}
            >
                <path d="M18 9.87V20H2V9.87a4.25 4.25 0 0 0 3-.38V14h10V9.5a4.26 4.26 0 0 0 3 .37zM3 0h4l-.67 6.03A3.43 3.43 0 0 1 3 9C1.34 9 .42 7.73.95 6.15L3 0zm5 0h4l.7 6.3c.17 1.5-.91 2.7-2.42 2.7h-.56A2.38 2.38 0 0 1 7.3 6.3L8 0zm5 0h4l2.05 6.15C19.58 7.73 18.65 9 17 9a3.42 3.42 0 0 1-3.33-2.97L13 0z" />
            </svg>
        );
    }

    if (name === "trash") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                {...props}
            >
                <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
            </svg>
        );
    }

    if (name === "users") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                {...props}
            >
                <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
        );
    }

    if (name === "add") {
        return (
            <svg
                viewBox="0 0 20 20"
                enableBackground="new 0 0 20 20"
                className={className}
                {...props}
            >
                <path
                    fill={fill}
                    d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601 C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399 C15.952,9,16,9.447,16,10z"
                />
            </svg>
        );
    }
    if (name === "edit") {
        return (
            <svg
                viewBox="0 0 24 24"
                enableBackground="new 0 0 20 20"
                className={className}
                {...props}
            >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
        );
    }
    if (name === "search") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 50 50"
                {...props}
            >
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>
        );
    }
    if (name === "cog") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                fill="#000000"
                width="20"
                height="20"
                viewBox="0 0 569.613 569.614"
                {...props}
            >
                <g>
                    <g>
                        <path d="M371.49,563.638l113.052-65.854c5.26-3.063,9.088-8.094,10.64-13.975c1.555-5.888,0.701-12.148-2.359-17.405    l-30.769-52.807c4.789-6.524,9.083-13.115,12.972-19.918c3.893-6.799,7.405-13.84,10.606-21.275l61.114-0.221    c6.086-0.021,11.915-2.464,16.202-6.781c4.287-4.32,6.687-10.165,6.665-16.255l-0.48-130.833    c-0.024-6.089-2.464-11.919-6.784-16.206c-4.299-4.269-10.113-6.662-16.166-6.662c-0.03,0-0.062,0-0.089,0l-61.182,0.242    c-6.444-14.462-14.428-28.14-23.871-40.913l30.417-53.143c6.294-11.001,2.481-25.025-8.52-31.316L369.403,5.335    c-5.281-3.023-11.545-3.822-17.424-2.231c-5.872,1.598-10.872,5.462-13.892,10.747L307.665,67    c-15.766-1.662-31.653-1.613-47.363,0.144l-30.796-52.892c-3.063-5.263-8.094-9.091-13.975-10.646    c-5.884-1.551-12.148-0.704-17.408,2.359L85.068,71.823c-10.949,6.38-14.657,20.429-8.28,31.38l30.765,52.831    c-4.761,6.484-9.048,13.076-12.953,19.899c-3.904,6.824-7.417,13.855-10.6,21.255l-61.139,0.235    C10.187,197.472-0.046,207.785,0,220.456L0.48,351.29c0.024,6.086,2.463,11.919,6.784,16.206    c4.299,4.269,10.11,6.661,16.166,6.661c0.028,0,0.058,0,0.086,0l61.203-0.229c6.432,14.452,14.413,28.131,23.868,40.915    l-30.413,53.141c-3.023,5.284-3.825,11.548-2.231,17.423c1.597,5.872,5.462,10.872,10.747,13.896l113.535,64.977    c3.596,2.056,7.513,3.032,11.38,3.032c7.962,0,15.701-4.146,19.942-11.552l30.417-53.149c15.799,1.671,31.684,1.619,47.348-0.144    l30.799,52.89c3.066,5.26,8.094,9.088,13.978,10.643C359.967,567.552,366.23,566.705,371.49,563.638z M341.129,465.911    c-4.902-8.418-14.599-12.815-24.137-10.994c-20.588,3.935-42.174,3.999-63.128,0.202c-9.572-1.735-19.184,2.741-24.015,11.181    l-26.748,46.745l-73.694-42.18l26.75-46.741c4.832-8.439,3.819-19.006-2.521-26.371c-13.978-16.239-24.685-34.594-31.818-54.554    c-3.265-9.131-11.918-15.227-21.61-15.227c-0.027,0-0.058,0-0.085,0l-53.825,0.199l-0.315-84.937l53.819-0.205    c9.722-0.04,18.366-6.197,21.576-15.374c3.69-10.557,7.962-20.019,13.06-28.917c5.101-8.914,11.089-17.387,18.311-25.897    c6.294-7.417,7.225-17.993,2.334-26.396l-27.081-46.509l73.385-42.754l27.078,46.497c4.893,8.4,14.544,12.821,24.095,11.004    c20.716-3.911,42.317-3.978,63.189-0.19c9.557,1.753,19.189-2.742,24.019-11.178l26.753-46.744l73.697,42.179l-26.753,46.742    c-4.826,8.437-3.816,19,2.521,26.368c13.956,16.221,24.669,34.587,31.842,54.59c3.271,9.119,11.919,15.202,21.604,15.202    c0.031,0,0.062,0,0.092,0l53.789-0.214l0.315,84.927l-53.783,0.192c-9.712,0.037-18.351,6.182-21.569,15.347    c-3.746,10.654-8.023,20.131-13.082,28.975c-5.064,8.847-11.067,17.338-18.356,25.958c-6.271,7.418-7.194,17.978-2.305,26.368    l27.078,46.472l-73.391,42.749L341.129,465.911z" />
                        <path d="M392.531,346.458c16.472-28.773,20.746-62.24,12.047-94.232s-29.342-58.685-58.115-75.151    c-18.761-10.74-40.05-16.417-61.562-16.417c-44.446,0-85.762,23.944-107.822,62.485c-33.994,59.404-13.327,135.39,46.071,169.386    c18.764,10.737,40.052,16.411,61.564,16.411C329.158,408.943,370.475,385.001,392.531,346.458z M352.696,323.658    c-13.902,24.293-39.955,39.385-67.985,39.385c-13.528,0-26.934-3.58-38.764-10.349c-37.433-21.426-50.456-69.312-29.033-106.751    c13.905-24.291,39.958-39.385,67.987-39.385c13.528,0,26.932,3.58,38.762,10.355c18.136,10.379,31.142,27.197,36.628,47.359    C365.771,284.435,363.075,305.524,352.696,323.658z" />
                    </g>
                </g>
            </svg>
        );
    }

    return null;
};
