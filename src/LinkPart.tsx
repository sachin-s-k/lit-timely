import { useSelector } from "react-redux";

const LinkPart = () => {
  const userData = useSelector((state: any) => state.registration.userData);
  return (
    <>
      <div className=" mb-6 mt-4">
        {/* Avatar and Name */}
        <div className="flex justify-between">
          <div className="mb-2 flex items-center gap-3">
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-300">
              <span className="text-gray-700 font-medium">S</span>
            </div>
            <div className="">
              <div>
                <span className="text-gray-600 text-sm font-light font-sans">
                  {userData.firstName + " " + userData.lastName}
                </span>
              </div>
              <div>
                <a
                  href={`/${userData?.personalUrl}`}
                  className="text-blue-500 text-sm underline"
                  target="_blank"
                >
                  {`https://main.d2ogeweki0hgqu.amplifyapp.com/${userData?.personalUrl}`}
                </a>
              </div>
            </div>
          </div>
          {/* <div className="flex gap-2 items-center">
            <div>
              <div className="border-gray-300 border-1 hover:bg-blue-100 w-28 h-7 flex justify-center items-center border-2 rounded-full mx-auto cursor-pointer">
                <div className="flex items-center gap-2   text-black  font-light ">
                  <Plus size={14} />
                  create
                </div>
              </div>
            </div>
            <div className="cursor-pointer">
              <Settings size={21} color="gray" />
            </div>
          </div> */}
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-200"></div>
      </div>
    </>
  );
};

export default LinkPart;
