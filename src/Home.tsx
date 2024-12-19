import { Button } from "../src/components/ui/button";

import { ArrowRight } from "lucide-react";
import { Calendar, Clock, LinkIcon } from "lucide-react";
import "@fontsource/inter/400.css"; // Weight 400
import "@fontsource/inter/500.css"; // Weight 500
import "@fontsource/inter/600.css"; // Weight 600
import "@fontsource/inter/700.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../src/components/ui/card";
import Header from "./Header";
import TestimonialsCarousel from "./Testimonials";

import Footer from "./Footer";

//import TestimonialsCarousel from "../components/testimonials";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link",
  },
];

const howItWorks = [
  { step: "Sign Up", description: "Create your free Schedulrr account" },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];
function Home() {
  return (
    <>
      <main style={{ fontFamily: "'Inter', sans-serif" }}>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-[#f8f9fb] to-white">
          <main className="container mx-auto px-4 py-16">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
              <div className="lg:w-1/2">
                <h1 className="text-7xl  font-extrabold bg-gradient-to-br from-blue-600 to-blue-400 bg-clip-text tracking-tighter text-transparent pb-6 pr-2 ">
                  Plan Your Time with LIT School
                </h1>
                <p className="text-xl text-gray-600 mb-10">
                  Schedulrr helps you manage your time effectively. Create
                  events, set your availability, and let others book time with
                  you seamlessly.
                </p>

                <Button
                  size="lg"
                  className="text-lg text-white bg-blue-500 hover:bg-blue-400"
                >
                  Get Start <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  <img
                    className="mt-10 "
                    src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/application_resource/1733316430518.png"
                    alt="scheduling image"
                  />
                </div>
              </div>
            </div>

            {/* Key Features Section */}
            <div className="mb-24">
              <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="transition-transform transform hover:scale-105  shadow-lg hover:shadow-2xl ease-in-out duration-300"
                  >
                    <CardHeader>
                      <feature.icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
                      <CardTitle className="text-center text-blue-600">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="mb-24">
              <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
                What Our Users Say
              </h2>
              <TestimonialsCarousel />
            </div>
            {/* how it works */}
            <div className="mb-24">
              <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
                How it works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4">
                {howItWorks.map((step, index) => {
                  return (
                    <div className="text-center" key={index}>
                      <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <span>{index + 1}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {step.step}
                      </h3>
                      <h3 className="text-gray-600">{step.description}</h3>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
              <h2>Ready to simplify your Scheduling</h2>
              <p className="text-xl mb-6">
                Join thousands of professionals who trust Schedulrr for
                efficient time management.
              </p>
              <Button size="lg" variant="secondary" className="text-blue-600">
                {" "}
                Start For Free
                <ArrowRight />
              </Button>{" "}
            </div>
          </main>
          <Footer />
        </div>

        {/* <Component /> */}
      </main>
    </>
  );
}

export default Home;
