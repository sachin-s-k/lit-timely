import { useMediaQuery } from "react-responsive";
import MobileEventScheduler from "./MobileEventScheduler"; // We'll create this
import EventScheduler from "./SlidingSidebar";

const ResponsiveEventScheduler = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return isMobile ? <MobileEventScheduler /> : <EventScheduler />;
};

export default ResponsiveEventScheduler;
