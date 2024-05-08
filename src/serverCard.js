import React from 'react';

function ServerCard({ server }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px' }}>
      <h3>{server.name}</h3>
      <p><strong>ID:</strong> {server.id}</p>
      <p><strong>URL:</strong> {server.url}</p>
    </div>
  );
}

export default ServerCard;