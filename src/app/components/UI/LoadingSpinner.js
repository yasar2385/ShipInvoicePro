// components/LoadingSpinner.js
export default function LoadingSpinnerCustom() {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
}
