import React, { useState, useEffect } from "react";

// ✅ API URL from environment
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");

  // Auto Welcome message
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text:
          lang === "en"
            ? "Hello! How can I help you today?"
            : "नमस्कार! मी तुम्हाला कशी मदत करू शकतो?",
      },
    ]);
  }, [lang]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message:
            lang === "en"
              ? input
              : `Translate this Marathi message to English, answer, then translate back to Marathi: ${input}`,
        }),
      });

      const data = await response.json();

      const botMsg = {
        sender: "bot",
        text: data.reply || "No response from server",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);

      const errMsg = {
        sender: "bot",
        text:
          lang === "en"
            ? "⚠️ Unable to reach server."
            : "⚠️ सर्व्हरशी संपर्क होऊ शकला नाही.",
      };

      setMessages((prev) => [...prev, errMsg]);
    }

    setInput("");
  };

  return (
    <div
      style={{
        height: "100vh",
        background: theme === "light" ? "#f5f5f5" : "#1e1e1e",
        fontFamily: "Segoe UI, Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          display: "flex",
          flexDirection: "column",
          background: theme === "light" ? "#ffffff" : "#212121",
        }}
      >
        {/* NAVBAR */}
        <div
          style={{
            height: "55px",
            background: theme === "light" ? "#ffffff" : "#292929",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
            boxShadow:
              theme === "light"
                ? "0 2px 4px rgba(0,0,0,0.1)"
                : "0 2px 4px rgba(255,255,255,0.1)",
            position: "relative",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              color: theme === "light" ? "#000" : "#fff",
            }}
          >
            Atharva's AI Chatbot
          </h2>

          <div
            style={{
              position: "absolute",
              right: "20px",
              display: "flex",
              gap: "8px",
            }}
          >
            <button
              onClick={() => setLang(lang === "en" ? "mr" : "en")}
              style={{
                padding: "5px 10px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: theme === "light" ? "#dedede" : "#444",
                color: theme === "light" ? "#000" : "#fff",
                fontSize: "12px",
              }}
            >
              {lang === "en" ? "मराठी" : "English"}
            </button>

            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              style={{
                padding: "5px 10px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: theme === "light" ? "#dedede" : "#444",
                color: theme === "light" ? "#000" : "#fff",
                fontSize: "12px",
              }}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </div>

        {/* CHAT WINDOW */}
        <div style={{ flex: 1, overflowY: "auto", padding: "15px" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "12px",
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <span
                style={{
                  padding: "10px 14px",
                  borderRadius: "16px",
                  maxWidth: "70%",
                  fontSize: "15px",
                  lineHeight: "1.4",
                  background:
                    msg.sender === "user"
                      ? "#4e8cff"
                      : theme === "light"
                      ? "#e4e6eb"
                      : "#333",
                  color:
                    msg.sender === "user"
                      ? "#fff"
                      : theme === "light"
                      ? "#000"
                      : "#fff",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div
          style={{
            display: "flex",
            padding: "12px",
            gap: "10px",
            borderTop:
              theme === "light" ? "1px solid #ddd" : "1px solid #444",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              lang === "en" ? "Ask something..." : "काहीही विचारा..."
            }
            style={{
              flex: 1,
              padding: "12px 18px",
              borderRadius: "25px",
              border: "1px solid #aaa",
              outline: "none",
              fontSize: "15px",
              background: theme === "light" ? "#fff" : "#1e1e1e",
              color: theme === "light" ? "#000" : "#fff",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              border: "none",
              background: "#4e8cff",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
