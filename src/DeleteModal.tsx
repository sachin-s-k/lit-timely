// const DeleteModal = ({ isOpen, onClose, deleteFn }: any) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-8 rounded-lg w-96 max-w-full shadow-lg">
//         <h2 className="text-xl font-semibold text-center">Delete ?</h2>
//         <p
//           className="mt-4 text-gray-600 px-4"
//           style={{ textAlign: "justify" }} // Add this style for justified alignment
//         >
//           Users will be unable to schedule further meetings with deleted event
//           types. Meetings previously scheduled will not be affected.
//         </p>
//         <div className="mt-6 flex justify-around">
//           <button
//             onClick={onClose}
//             className="px-12 py-2.5 border  border-gray-600 text-gray-700 font-light rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={deleteFn}
//             className="px-12 py-2.5 bg-red-500 text-white font-light rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
//           >
//             Yes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// //onConfirm(),
// export default DeleteModal;
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const DeleteModal = ({ isOpen, onClose, deleteFn }: any) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    console.log("Delete function called");
    setIsDeleting(true); // Set loading state to true
    try {
      // Simulate a delay to show loader, replace with your actual delete function
      //await new Promise((resolve) => setTimeout(resolve, 2000));
      await deleteFn(); // Call the actual delete function

      onClose(); // Close modal on success
      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      //setIsDeleting(false); // Reset loading state
    }
  };

  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 max-w-full shadow-lg">
        <h2 className="text-xl font-semibold text-center">Delete?</h2>
        <p className="mt-4 text-gray-600 px-4" style={{ textAlign: "justify" }}>
          Users will be unable to schedule further meetings with deleted event
          types. Meetings previously scheduled will not be affected.
        </p>
        <div className="mt-6 flex justify-around">
          <button
            onClick={onClose}
            disabled={isDeleting} // Disable Cancel button during delete
            className={`px-10 py-2 border border-gray-600 text-gray-700 font-light text-sm rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting} // Disable Delete button during delete
            className={`px-12 py-2.5 bg-red-500 text-white font-light rounded-full ${
              isDeleting ? " cursor-not-allowed" : "hover:bg-red-600"
            } focus:outline-none focus:ring-2 focus:ring-red-300`}
          >
            <div className="flex justify-center items-center w-full h-full">
              {isDeleting ? (
                <ThreeDots
                  height="24"
                  width="24"
                  radius="12"
                  color="#fff"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              ) : (
                "Yes"
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
