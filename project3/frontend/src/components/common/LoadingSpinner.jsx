const LoadingSpinner = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary">
            <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/30"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
                </div>
                <p className="text-gray-400 font-body">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
