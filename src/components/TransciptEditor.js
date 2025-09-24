import React from "react";

function TranscriptEditor({ text, onChange }) {
  return (
    <div style={{marginBottom: '20px', padding: '0', borderRadius: '8px'}}>
      <h3 style={{margin: '0 0 12px 0', color: '#f5efe6'}}>✏️ Edit Transcript</h3>
      <textarea
        rows="8"
        style={{width: '100%', padding: '12px', border: '1px solid rgba(11,58,102,0.06)', borderRadius: '6px', fontSize: '14px', resize: 'vertical', minHeight: '150px', background: '#fff8f0', color: '#0f1720'}}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your transcript will appear here for editing..."
      />
    </div>
  );
}

export default TranscriptEditor;
