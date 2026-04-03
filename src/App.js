import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const sendMessage = async () => {
    if (!message) return;

    setReply("");
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const errText = await res.text();
        setErrorMsg("Chat error: " + errText);
        return;
      }

      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      setErrorMsg("Connection failed: Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Atharva's AI Chatbot</h1>

      {errorMsg && (
        <div style={{
          color: "red",
          marginBottom: 20,
          padding: 15,
          border: "1px solid red",
          borderRadius: 8,
          backgroundColor: "#fee2e2"
        }}>
          <strong>Error:</strong> {errorMsg}
          <br />
          <button onClick={() => setErrorMsg("")} style={{
            marginTop: 10,
            padding: "5px 10px",
            background: "white",
            border: "1px solid #f00",
            borderRadius: 4,
            cursor: "pointer"
          }}>Clear</button>
        </div>
      )}

      <input
        type="text"
        placeholder="Ask something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !loading) sendMessage(); }}
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>

      <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {reply}
      </div>
    </div>
  );
}

export default App;

