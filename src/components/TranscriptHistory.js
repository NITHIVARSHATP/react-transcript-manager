import React from "react";

function TranscriptHistory({ history, onSelect }) {
  return (
    <div style={{padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f5f5f5', height: 'fit-content'}}>
      <h3 style={{margin: '0 0 15px 0', color: '#555'}}>📚 History</h3>
      {history.length === 0 ? (
        <p style={{color: '#888', fontStyle: 'italic'}}>No transcripts yet.</p>
      ) : (
        <div style={{listStyle: 'none', padding: 0, margin: 0}}>
          {history.map((item, index) => (
            <button key={index} onClick={() => onSelect(item)}
              style={{width: '100%', padding: '8px', marginBottom: '8px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', textAlign: 'left', fontSize: '12px'}}
            >
              {item.substring(0, 35)}...
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TranscriptHistory;
