import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [requestData, setRequestData] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5001");

    socket.onopen = function(event) {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = function(event) {
      console.log("Received message:", event.data);
      setResponse(event.data);
    };

    // Clean up function to close the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once

  const handleSubmit = async (event) => {
    event.preventDefault();
    const socket = new WebSocket("ws://localhost:5001")
    
    socket.onopen = function(event) {
      console.log("WebSocket connection opened to receive request");
      // Send the request data to the WebSocket server
      console.log(requestData)
      socket.send(requestData);
    };

    socket.onclose = function(event) {
      console.log("WebSocket connection closed");
    };
  };

  const handleChange = (event) => {
    setRequestData(event.target.value);
  };

  return (
    <div className="App">
      <h1>The load balancer client</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="data">Request</label>
        <input
          type="text"
          id="data"
          name="data"
          value={requestData}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
