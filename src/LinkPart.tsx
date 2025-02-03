import { useSelector } from "react-redux";

const LinkPart = () => {
  const userData = useSelector((state: any) => state.registration.userData);
  return (
    <>
      <div className=" mb-6 mt-5">
        {/* Avatar and Name */}
        <div className="flex justify-between">
          <div className="mb-2 flex items-center gap-3">
            <div className="w-10 h-10 flex justify-center mt-2 items-center rounded-full bg-gray-200 border  border-blue-50">
              <span className="text-gray-900 font-medium">S</span>
            </div>
            <div className="mt-2">
              <div>
                <span className="text-gray-600 text-md font-light font-sans">
                  {userData.firstName + " " + userData.lastName}
                </span>
              </div>
              <div className="">
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
        </div>

        {/* Divider */}
        <div className="w-full border-t border-blue-100 shadow-lg mt-2 b"></div>
      </div>
    </>
  );
};

export default LinkPart;
