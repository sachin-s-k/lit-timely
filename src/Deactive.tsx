import reschedule from "../src/assets/images/reschedule.svg";
const Deactive = () => {
  return (
    <>
      <div className="relative h-screen overflow-hidden flex items-center justify-center">
        {/* Main Content */}
        <div className="bg-white p-8  text-center max-w-lg w-full">
          {/* Logo */}
          <div className="mt-80">
            <img src={reschedule} alt="Logo" className="mx-auto w-96" />
          </div>

          {/* Message */}
          <h1 className="text-xl font-semibold text-gray-800 mb-6">
            Sorry, the event you're looking to cancel is in the past.
          </h1>

          {/* Calendly Embed */}
          <div className="calendly-embed flex justify-center">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/your-calendly-link"
              style={{ minWidth: "320px", height: "580px" }}
            ></div>
          </div>
        </div>

        {/* Powered by Calendly Triangle */}
        <a
          href="https://lit.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-0 right-0 bg-gray-600 text-white text-xs font-bold w-24 h-24 flex items-start justify-center [clip-path:polygon(100%_0,0_0,100%_100%)]"
        >
          <div className="flex flex-col items-center justify-center space-y-1">
            <span className="transform rotate-45 text-xs font-semibold text-center translate-x-[20px] translate-y-[22px]">
              Powered By
            </span>
            <span className="transform rotate-45 text-sm font-bold text-center translate-x-[8px] translate-y-[12px]">
              LIT
            </span>
          </div>
        </a>
      </div>
    </>
  );
};

export default Deactive;
