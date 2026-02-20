import { FiPaperclip, FiSend } from "react-icons/fi";

export default function ChatInput() {
  return (
    <div className="chat-input">
      <div>
        <div className="chat-input-wrapper">
          <input
            type="text"
            placeholder="Ask something about your document..."
          />

          <div className="input-actions">
            <button className="icon-button">
                <FiPaperclip className="clip-icon" />
            </button>

            <button className="send-button">
                <FiSend className="send-icon" />
            </button>
          </div>
        </div>

        <p
          style={{
            fontSize: "12px",
            color: "#9CA3AF",
            marginTop: "8px",
            textAlign: "center",
          }}
        >
          AI responses are for informational purposes only and not legal advice.
        </p>
      </div>
    </div>
  );
}