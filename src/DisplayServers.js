import React, { useState, useEffect } from 'react';
import ServerCard from './serverCard';

function ServerList({server}) {
  // State to store the list of servers
  const [servers, setServers] = useState([]);

  useEffect(() => {
    // Create a WebSocket connection
    const socket = new WebSocket('ws://localhost:5001');

    // Handle incoming messages from the WebSocket server
    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      // Check if the received message contains server data
      if (data && data.type === 'serverList') {
        setServers(data.servers);
      }
    };

    // Cleanup function to close the WebSocket connection
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {servers.map(server => (
        <ServerCard key={server.id} server={server}/>
      ))}
    </div>
  );

}

export default ServerList;
