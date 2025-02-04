import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

interface CardDataInterface {
  icon: React.ReactNode;
  title: string;
  description: string;
  redirect: string;
}

export const assistantCards: CardDataInterface[] = [
  {
    icon: <IoSettingsOutline className="size-10 mx-auto" />,
    title: "Onboard New Monitoring",
    description:
      "Ready to enhance your observability? Let’s walk you through the onboarding process step-by-step or explore our documentation.",
    redirect: "rag",
},
{
    icon: <BiSearchAlt className="size-10 mx-auto" />,
    title: "Explore Observability Data",
    description:
    "Got questions about your data? Access our tools or chat with us to turn your queries into actionable insights.",
    redirect: "sqlquery",
},
{
    icon: <BsQuestionCircle className="size-10 mx-auto" />,
    title: "Connect with the Observability Team",
    description:
    "Need help? Chat with us or browse our documentation for quick answers to your questions.",
    redirect: "assistant",
  },
];
