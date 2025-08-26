
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message}) => {
    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div className="w-[500px] h-auto bg-white border border-gray-200 rounded-lg p-4 shadow">
                <p className="mb-6 text-center">{message}</p>
                <div className="flex gap-2 mt-6">
                    <button className="flex-1 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600" onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className="flex-1 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal