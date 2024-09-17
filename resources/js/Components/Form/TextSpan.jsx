import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ className = '', ...props }, ref) {
    return (
        <span
            {...props}
            className={
                'border-2 p-2 border-gray-180 rounded-md ' +
                className
            }
        > { props.value } </span>
    );
});
