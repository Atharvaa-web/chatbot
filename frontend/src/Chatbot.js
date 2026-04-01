import React, { useState } from "react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage() {
    const res = await fetch("https://<YOUR-VERCEL-DOMAIN>/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Chatbot</h2>

      <textarea
        rows="4"
        style={{ width: "100%" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <br /><br />

      <button onClick={sendMessage}>Send</button>

      <h3>Response:</h3>
      <p>{reply}</p>
    </div>
  );
}

export default Chatbot;