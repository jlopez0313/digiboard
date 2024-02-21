import Icon from "../Icon";

export default function FabButton({ className = '', disabled, ...props }) {
    return (
        <button
            {...props}
            className={`
                absolute
                top-100
                right-5	
                p-0 
                w-10
                h-10
                bg-red-600
                rounded-full
                hover:bg-red-700
                active:shadow-lg
                mouse
                shadow
                transition
                ease-in
                duration-200
                focus:outline-none
                ${ disabled && 'opacity-25'}
            `}
            disabled={disabled}
        >
            <Icon name='add' fill='#FFFFFF' className='w-6 h-6 inline-block' />            
        </button>
    );
}
