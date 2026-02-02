const Loader = () => {
    return (
        <div className="w-full h-full flex justify-center items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loader;
