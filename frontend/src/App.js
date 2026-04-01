import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("https://YOUR-BACKEND-URL/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>My Chatbot</h1>
      <textarea
        rows="4"
        style={{ width: "100%" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <br /><br />
      <button onClick={sendMessage}>Send</button>

      <h3>Reply:</h3>
      <p>{reply}</p>
    </div>
  );
}

export default App;