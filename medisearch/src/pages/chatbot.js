// ChatbotComponent.js
import React, { useState } from "react";

function ChatbotComponent() {
  const [userInput, setUserInput] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const getChatbotResponse = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userInput }),
      });

      const data = await response.json();
      setChatbotResponse(data.response);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
    }
  };

  return (
    <div>
      <h1>Chatbot Interface</h1>
      <div>
        <input type="text" value={userInput} onChange={handleUserInput} />
        <button onClick={getChatbotResponse}>Get Response</button>
      </div>
      <div>
        <strong>Chatbot Response:</strong> {chatbotResponse}
      </div>
    </div>
  );
}

export default ChatbotComponent;
