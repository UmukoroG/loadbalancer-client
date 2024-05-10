import React, { useState, useEffect } from 'react';
import './App.css';
import ServerList from './DisplayServers';
import axios from 'axios'

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

    return () => {
      socket.close();
    };
  }, []); 
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const socket = new WebSocket("ws://localhost:5001")
    
    socket.onopen = function(event) {
      console.log("WebSocket connection opened to receive request");
      // Send the request data to the WebSocket server
      // console.log(requestData)
      socket.send(requestData);
      setRequestData("");
    };

    socket.onclose = function(event) {
      console.log("WebSocket connection closed");
    };
  };

  const handleChange = (event) => {
    setRequestData(event.target.value);
  };

  const convertJsonToCsv = (jsonData) => {
    const headers = Object.keys(jsonData[0]).join(',') + '\n';
    const csvRows = jsonData.map(row => Object.values(row).join(',')).join('\n');
    return headers + csvRows;
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:3001/download');
      const { data } = response;
      
      const csvData = convertJsonToCsv(data);

        // Create a Blob from the data
        const blob = new Blob([csvData], { type: 'text/csv' });

        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'data.csv';

        // Trigger the download
        link.click();
    } catch (error) {
        console.error('Error downloading data:', error);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>The Load Balancer Client</h1>
      </header>
      <form onSubmit={handleSubmit} className="request-form">
        <label htmlFor="data">Request</label>
        <input
          type="text"
          id="data"
          name="data"
          value={requestData}
          onChange={handleChange}
          className="request-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <ServerList className="server-list" />
      <button className='download-button' onClick={handleDownload}>Download Data</button>
      <footer className='Footer'>
        <h3>The footer</h3>
      </footer>
    </div>
  );
}

export default App;
