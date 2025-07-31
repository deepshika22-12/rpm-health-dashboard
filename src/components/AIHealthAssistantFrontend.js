import React, { useState } from "react";

export default function AIHealthAssistant() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // Read OpenAI API key from environment variables
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const sendMessage = async () => {
    if (!input.trim()) return;

    setChat((prev) => [...prev, { type: "user", text: input }]);
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful AI Health Assistant." },
            { role: "user", content: input },
          ],
          max_tokens: 150,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setChat((prev) => [...prev, { type: "bot", text: "❌ Error: " + data.error.message }]);
      } else {
        const reply = data.choices[0].message.content;
        setChat((prev) => [...prev, { type: "bot", text: reply }]);
      }
    } catch (error) {
      setChat((prev) => [...prev, { type: "bot", text: "❌ Error: Could not reach OpenAI." }]);
    }

    setInput("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={styles.container}>
      <h2>🩺 AI Health Assistant</h2>
      <div style={styles.chatBox}>
        {chat.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.type === "user" ? "#daf1ff" : "#e2ffe2",
            }}
          >
            <strong>{msg.type === "user" ? "You" : "AI"}:</strong> {msg.text}
          </div>
        ))}
        {loading && <p>⏳ Thinking...</p>}
      </div>
      <div style={styles.inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a health question..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    maxWidth: 600,
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: 10,
    padding: 10,
    height: 300,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
    background: "#f9f9f9",
  },
  message: {
    padding: 10,
    borderRadius: 8,
    maxWidth: "80%",
  },
  inputRow: {
    display: "flex",
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  button: {
    padding: "10px 20px",
    fontSize: 16,
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};
