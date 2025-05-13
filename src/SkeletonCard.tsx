import "../src/shimmer.css"; // Ensure to include shimmer styles here

const SkeletonCard = () => {
  return (
    <div className="flex flex-wrap -mx-1 md:-mx-2">
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-1 md:px-2 mb-4" // Changed lg:w-1/4 → lg:w-1/3, removed xl:w-1/5
        >
          <div className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-gray-400 p-4 animate-pulse h-full">
            {/* Header */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>

            {/* Content */}
            <div className="mt-4 space-y-2.5">
              {/* Paragraph */}
              <div className="h-1 rounded w-full"></div>
              <div className="h-1 rounded w-4/5"></div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2 w-2/6">
                  <div className="bg-gray-300 h-2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
