interface ChatProps {
  sender: "assistant" | "user"
  message: string;
  time: string;
}

const Chat: React.FC<ChatProps> = ({
  sender,
  message,
  time,
}) => {
  return (
    <div
      className={`flex flex-col lg:text-base text-sm ${
        sender === "user" ? "items-end" : "items-start"
      } mb-4`}
    >
      <div
        className={`px-4 py-2 rounded-lg max-w-[850px] ${
          sender === "user"
            ? "bg-primary-20 text-primary"
            : "bg-gray-100 text-secondary"
        }`}
      >
        {message}
      </div>
      <div className="text-secondary-60 text-[13px] mt-1">{time}</div>
    </div>
  );
};

export default Chat;
