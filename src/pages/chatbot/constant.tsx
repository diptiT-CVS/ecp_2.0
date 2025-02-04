import { IoBulbOutline } from "react-icons/io5";
import { RiQuestionLine } from "react-icons/ri";
import { GoBook } from "react-icons/go";

export const cardData = [
  {
    title: "System Overview",
    icon: <IoBulbOutline className="text-[20px]" />,
    description: "Understand the overall system design.",
  },
  {
    title: "Query Guidelines",
    icon: <RiQuestionLine className="text-[22px]" />,
    description: "Detailed user instructions.",
  },
  {
    title: "Knowledge Base Access",
    icon: <GoBook className="text-[20px]" />,
    description: "Common questions and answers.",
  },
];

export const assistantsData: Record<
  string,
  {
    name: string;
    conversation: { sender: "assistant" | "user"; message: string; time: string }[];
  }
> = {
  rag: {
    name: "RAG Assistant",
    conversation: [
      {
        sender: "assistant",
        message:
          "Hello! I am your assistant. I can help you find relevant information from our documentation. What would you like to know?",
        time: "5:40 PM",
      },
      {
        sender: "user",
        message: "Hello, I need help.",
        time: "5:41 PM",
      },
      {
        sender: "assistant",
        message:
          "Let me retrieve that information for you. According to our knowledge base: [Retrieved content] Would you like to know more?",
        time: "5:41 PM",
      },
    ],
  },
  sqlquery: {
    name: "Sql Query Assistant",
    conversation: [
      {
        sender: "assistant",
        message:
          "Hello! I am your assistant. I can help you find relevant information from our documentation.",
        time: "5:40 PM",
      },
      {
        sender: "user",
        message: "Hello, I need help.",
        time: "5:41 PM",
      },
      {
        sender: "assistant",
        message:
          "Let me retrieve that information for you.",
        time: "5:43 PM",
      },
    ],
  },
  assistant: {
    name: "Assistant",
    conversation: [
      {
        sender: "assistant",
        message:
          "Hello! I am your assistant.",
        time: "5:40 PM",
      },
      {
        sender: "user",
        message: "Hello, I need help.",
        time: "5:41 PM",
      },
      {
        sender: "assistant",
        message:
          "Let me retrieve that information for you.",
        time: "5:41 PM",
      },
    ],
  },
};

