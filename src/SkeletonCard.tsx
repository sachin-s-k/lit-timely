import "../src/shimmer.css"; // Ensure to include shimmer styles here

const SkeletonCard = () => {
  return (
    <div className=" flex flex-row ">
      <div className="border  border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-gray-400 m-1 p-4 animate-pulse">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-3">
          {/* Paragraph */}
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-4/5"></div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-gray-300 h-2 rounded-full"></div>
            </div>
          </div>

          {/* Avatars Row */}
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Footer with Buttons */}
        <div className="mt-4 flex justify-between">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-gray-400 m-1 p-4 animate-pulse">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-3">
          {/* Paragraph */}
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-4/5"></div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-gray-300 h-2 rounded-full"></div>
            </div>
          </div>

          {/* Avatars Row */}
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Footer with Buttons */}
        <div className="mt-4 flex justify-between ">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
