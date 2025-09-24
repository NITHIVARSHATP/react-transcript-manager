import React, { useState } from "react";

function TranscriptUploader({ onUpload }) {
  const [text, setText] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target.result);
      onUpload(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    onUpload(e.target.value);
  };

  return (
    <div style={{marginBottom: '20px', padding: '0'}}>
      <h3 style={{margin: '0 0 12px 0', color: '#f5efe6'}}>📄 Upload Transcript</h3>
      <input type="file" accept=".txt" onChange={handleFileUpload} style={{marginBottom: '10px', padding: '5px'}} />
      <textarea
        rows="6"
        style={{width: '100%', padding: '12px', border: '1px solid rgba(11,58,102,0.06)', borderRadius: '6px', fontSize: '14px', resize: 'vertical', background: '#fff8f0', color: '#111827'}}
        value={text}
        onChange={handleTextChange}
        placeholder="Or paste transcript here..."
      />
    </div>
  );
}

export default TranscriptUploader;
