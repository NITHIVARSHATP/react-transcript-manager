import React from "react";

function AccuracyChart({ data }) {
  return (
    <div style={{marginTop: '20px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9'}}>
      <h3 style={{margin: '0 0 15px 0', color: '#555'}}>📈 Accuracy Trend</h3>
      <div>
        {data.length === 0 ? (
          <p style={{color: '#888', fontStyle: 'italic'}}>No accuracy data yet.</p>
        ) : (
          <div>
            {data.map((item, index) => (
              <button key={index} style={{width: '100%', padding: '8px', marginBottom: '8px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', cursor: 'default', textAlign: 'left', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%'}}>{item.test}</span>
                <strong style={{color: item.accuracy > 80 ? '#4CAF50' : item.accuracy > 60 ? '#FF9800' : '#f44336'}}>{item.accuracy}%</strong>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AccuracyChart;
