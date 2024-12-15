export const Check = () => {
  return (
    <>
      {/* <div className="relative w-full h-64 border rounded-md shadow-md bg-white">
        <a
          href="https://lit.dev"
          target="_blank"
          className="absolute top-0 right-0 bg-gray-400 text-white text-xs font-bold w-32 h-32 flex items-start justify-end [clip-path:polygon(100%_0,0_0,100%_100%)]"
        >
          <span className="absolute top-14 right-2 transform rotate-45">
            Powered by Lit
          </span>
        </a>
      </div> */}
      <div className="relative w-full h-64 border rounded-md shadow-md bg-white m-4">
        {/* Triangle Badge */}
        <a
          href="https://lit.dev"
          target="_blank"
          className="absolute top-0 right-0 bg-gray-600 text-white text-xs font-bold w-24 h-24 flex items-start justify-center [clip-path:polygon(100%_0,0_0,100%_100%)]"
        >
          <div className="flex flex-col items-center justify-center space-y-1">
            <span className="transform rotate-45 text-xs   font-semibold text-center translate-x-[20px] translate-y-[22px]">
              Powered By
            </span>
            <span className="transform rotate-45 text-sm  font-bold text-center translate-x-[8px] translate-y-[12px]">
              LIT
            </span>
          </div>
        </a>

        {/* Visual Tie (small folded corner) */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-white border-r border-t border-gray-300 [clip-path:polygon(100%_0,0_0,100%_100%)]"></div>

        {/* Main Content */}
        <p className="p-4 text-gray-800">This is your main content area.</p>
      </div>
    </>
  );
};
