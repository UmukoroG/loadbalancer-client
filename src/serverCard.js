import React from 'react';
import './serverCard.css';

function ServerCard({ server }) {
  if (!server) {
    return null;
  }

  return (
    <div className="ServerCard">
      <h3>{server.name}</h3>
      <p><strong>ID:</strong> {server.id}</p>
      <p><strong>URL:</strong> {server.url}</p>
      <p><strong>DATA:</strong></p>
      <ul>
        {/* Check if server.data is defined before mapping */}
        {server.data && server.data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default ServerCard;
