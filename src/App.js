import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setReply(data.reply || "");
      setMessage("");
    } catch (err) {
      setError(err.message);
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>My Chatbot</h1>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
        disabled={loading}
      />

      <button onClick={sendMessage} disabled={loading || !message.trim()}>
        {loading ? "Sending..." : "Send"}
      </button>

      {error && <div style={{color: 'red'}}>Error: {error}</div>}
      {reply && <h3>Reply: {reply}</h3>}
    </div>
  );
}

export default App;
