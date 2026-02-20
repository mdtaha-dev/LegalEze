import "../components/chat/chat.css";
import ChatInput from "../components/chat/ChatInput";

export default function Chat() {
  return (
    <div className="chat-container">
      <div className="messages">
        <div className="message ai">
          <div className="bubble">
            Hello 👋 How can I assist you with your legal documents today?
          </div>
        </div>
      </div>

      <ChatInput />
    </div>
  );
}