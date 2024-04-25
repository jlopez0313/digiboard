
export default function Guest({ children }) {
    return (
        <div className="flex flex-col items-center bg-gray-50 h-full overflow-hidden">
                {children}
        </div>
    );
}
