const DeleteModal = ({ isOpen, onClose, deleteFn }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 max-w-full shadow-lg">
        <h2 className="text-xl font-semibold text-center">Delete ?</h2>
        <p
          className="mt-4 text-gray-600 px-4"
          style={{ textAlign: "justify" }} // Add this style for justified alignment
        >
          Users will be unable to schedule further meetings with deleted event
          types. Meetings previously scheduled will not be affected.
        </p>
        <div className="mt-6 flex justify-around">
          <button
            onClick={onClose}
            className="px-12 py-2.5 border  border-gray-600 text-gray-700 font-light rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={deleteFn()}
            className="px-12 py-2.5 bg-red-500 text-white font-light rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
//onConfirm(),
export default DeleteModal;
