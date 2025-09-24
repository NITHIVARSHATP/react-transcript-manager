import React from "react";

function ExportButton({ text, filename }) {
  const handleExport = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <button 
      onClick={handleExport}
      disabled={!text.trim()}
      style={{padding: '10px 20px', backgroundColor: text.trim() ? '#4CAF50' : '#ccc', color: 'white', border: 'none', borderRadius: '4px', cursor: text.trim() ? 'pointer' : 'not-allowed', fontSize: '14px'}}
    >
      💾 Export Transcript
    </button>
  );
}

export default ExportButton;
