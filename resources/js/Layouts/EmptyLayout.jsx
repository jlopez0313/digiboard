
export default function Guest({ children, ...props }) {

    return (
        <div className="h-full w-full h-full overflow-hidden" style={{ background: props?.parametros?.color || '#000' }}>
                {children}
        </div>
    );
}
