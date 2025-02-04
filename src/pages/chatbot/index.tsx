import React from "react";
import { SiChatbot } from "react-icons/si";
import { GoBook } from "react-icons/go";
import { Button, Card, Input } from "antd";
import { VscSend } from "react-icons/vsc";
import { assistantsData, cardData } from "./constant";
import Chat from "../../components/chat";
import { useParams } from "react-router-dom";

const ChatBot: React.FC = () => {
  const { assistantType } = useParams<{ assistantType: string }>();
  // Get the first assistant as the default
  const defaultAssistantKey = Object.keys(assistantsData)[0];
  const assistant = assistantsData[assistantType || defaultAssistantKey];

  if (!assistant) {
    return (
      <div
        role="alert"
        className="text-center mt-20 text-red-600"
        aria-live="assertive"
      >
        Assistant not found!
      </div>
    );
  }

  return (
    <div
      className="h-screen w-full bg-gray-200 md:p-5 p-4 flex flex-col items-center gap-5 overflow-y-auto"
      role="main"
      aria-label="Chatbot page"
    >
      <div
        className="flex-1 overflow-y-auto flex flex-col bg-white max-w-[1500px] w-full rounded-xl min-h-[500px] shadow-md"
        aria-labelledby="chat-header"
      >
        <div
          id="chat-header"
          className="px-5 py-4 bg-primary text-white flex items-center gap-4 text-[18px]"
          role="banner"
        >
          <SiChatbot className="text-[20px]" aria-hidden="true" />
          <span>{assistant.name}</span>
        </div>
        <div className="flex-1 flex flex-col md:p-7 p-5 gap-5 overflow-y-auto">
          <div
            className="flex-1 border-b overflow-y-auto"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {assistant.conversation.map((msg, index) => (
              <Chat
                key={index}
                sender={msg.sender}
                message={msg.message}
                time={msg.time}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Input
              className="w-full"
              placeholder="Ask about our documentation"
              size="large"
              aria-label="Ask about our documentation"
            />
            <Button
              type="primary"
              icon={<VscSend aria-hidden="true" />}
              iconPosition="end"
              size="large"
              aria-label="Send message"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      <div
        className="md:p-6 p-4 bg-white w-full rounded-xl max-w-[1500px]"
        aria-labelledby="documentation-header"
      >
        <div
          id="documentation-header"
          className="flex items-center justify-center md:gap-4 gap-3 text-primary text-[18px] font-semibold"
        >
          <GoBook className="text-[20px]" aria-hidden="true" />
          <span>Documentation</span>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 md:mt-5 mt-4">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className="!border-primary-40 cursor-pointer"
              tabIndex={0}
              aria-labelledby={`card-title-${index}`}
              aria-describedby={`card-description-${index}`}
            >
              <div
                id={`card-title-${index}`}
                className="flex items-center gap-4 text-primary text-[18px] font-semibold flex-wrap"
              >
                {card.icon}
                {card.title}
              </div>
              <p id={`card-description-${index}`} className="text-gray-600">
                {card.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
