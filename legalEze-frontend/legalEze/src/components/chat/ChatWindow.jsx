import { useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import "./chat.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your AI Legal Assistant. How can I help you today?",
    },
  ]);

  const sendMessage = (text) => {
    const newMessages = [
      ...messages,
      { sender: "user", text },
      {
        sender: "ai",
        text: "This is a demo response from your AI lawyer.",
      },
    ];

    setMessages(newMessages);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default ChatWindow;