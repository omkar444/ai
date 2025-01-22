import React, { useState } from "react";
import axios from "axios";
import images from "../assets/images.png";
const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (currentMessage.trim()) {
      const userMessage = currentMessage;
      setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
      setCurrentMessage("");
      setIsLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:5000/generate-response",
          {
            text: userMessage,
          }
        );

      
        const aiResponse = response.data.response;
        setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
      } catch (error) {
        console.error("Error fetching AI response:", error.message);
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "Sorry, I couldn't process that right now." },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex h-full flex-col border border-stroke xl:w-4/4">
 <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 shadow-md">
  <div className="flex items-center">
    
    <div className="mr-4 h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-lg">
      <img
        src={images}
        alt="avatar"
        className="h-full w-full object-cover object-center"
      />
    </div>
   
    <p className="text-xl font-bold text-white drop-shadow-md">
      Welcome to BuddyAi
    </p>
  </div>

  
  <div className="text-white hover:text-gray-200 cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
</div>




      <div className="flex flex-col grow overflow-auto px-6 py-7.5 space-y-4 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex ${
        msg.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative px-5 py-3 max-w-xs rounded-lg shadow-lg ${
          msg.sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-800"
        }`}
      >
       
        <p className="leading-relaxed">{msg.text}</p>


        <div
          className={`absolute top-1/2 w-3 h-3 transform rotate-45 ${
            msg.sender === "user"
              ? "bg-blue-500 -right-1"
              : "bg-white -left-1"
          }`}
        ></div>
      </div>
    </div>
  ))}
</div>


      <div className="sticky bottom-0 px-6 py-5 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 shadow-md">
  <form
    onSubmit={handleSendMessage}
    className="flex items-center space-x-4"
  >
   
    <div className="relative flex-grow">
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        placeholder="Type your message..."
        className="w-full px-4 py-3 rounded-full border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
      />
     
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        💬
      </div>
    </div>
    
    <button
      type="submit"
      className={`flex items-center px-6 py-3 rounded-full text-white font-semibold transition-transform transform ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 active:scale-95"
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l-3 3 3 3v4a8 8 0 01-8-8z"
            ></path>
          </svg>
          Sending...
        </>
      ) : (
        "Send"
      )}
    </button>
  </form>
</div>

    </div>
  );
};

export default ChatContainer;
