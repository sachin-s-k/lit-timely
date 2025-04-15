import { ChevronRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

const AppointmentTypeCard = ({
  title,
  subtitle,
  description,
  icon,
  link,
}: any) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-start p-4 border border-gray-300 rounded-lg shadow hover:shadow-lg transition cursor-pointer relative"
      onClick={() => {
        navigate(link);
      }}
    >
      {/* Icon Section */}
      <div className="flex-shrink-0 text-blue-500">
        <img src={icon} alt="" className="w-20 h-20" />
      </div>

      {/* Text Section */}
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm font-medium text-gray-600">{subtitle}</p>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </div>

      {/* Forward Arrow Icon */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <ChevronRight color="black" size={20} />{" "}
        {/* Use the ChevronRight icon */}
      </div>
    </div>
  );
};

export default AppointmentTypeCard;
