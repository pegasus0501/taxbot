import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");

    const handleSend = async () => {
      if (!prompt.trim()) {
          setError("Please enter a tax-related question.");
          return;
      }
      
      setError("");
      setResponse("");
  
      try {
          const res = await axios.post("http://localhost:5001/api/prompt", { prompt }, {
              headers: { "Content-Type": "application/json" }
          });
  
          setResponse(res.data.response);
      } catch (err) {
          if (err.response && err.response.status === 400) {
              setError("Only tax-related questions are allowed. Please rephrase your query.");
          } else {
              setError("Error fetching response. Ensure API is running.");
          }
      }
  };
  

    return (
        <div style={{ width: "400px", margin: "auto", textAlign: "center", padding: "20px", border: "1px solid gray", borderRadius: "10px" }}>
            <h2>Deloitte Auditor Chat UI</h2>
            <textarea
                placeholder="Enter a tax-related prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ width: "100%", height: "80px" }}
            />
            <div>
                <button onClick={handleSend} style={{ margin: "10px", padding: "10px" }}>Send</button>
                <button onClick={() => setPrompt("")} style={{ margin: "10px", padding: "10px" }}>Cancel</button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {response && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
                    <h4>Response</h4>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default App;
