import React, { useState } from "react";
import TranscriptUploader from "../components/TranscriptUploader";
import TranscriptEditor from "../components/TransciptEditor";
import TranscriptHistory from "../components/TranscriptHistory";
import ExportButton from "../components/ExportButton";

function TranscriptManagerPage() {
  const [currentText, setCurrentText] = useState("");
  const [history, setHistory] = useState([
    "Sample Meeting: Discussed the quarterly project goals and team responsibilities for the upcoming sprint.",
    "Interview Transcript: Candidate showed strong technical skills and good communication abilities during the session.",
    "Lecture Notes: Introduction to machine learning concepts including supervised and unsupervised learning methods."
  ]);

  const handleUpload = (text) => {
    setCurrentText(text);
    setHistory((prev) => [...prev, text]);
  };

  const handleSelectHistory = (text) => {
    setCurrentText(text);
  };

  return (
    <div className="page">
      <h2 style={{textAlign: 'center', marginBottom: '22px'}}>📝 Transcript Manager</h2>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px'}}>
        <div>
          <div className="card uploader" style={{marginBottom: '18px'}}>
            <TranscriptUploader onUpload={handleUpload} />
          </div>
          <div className="card dark" style={{marginBottom: '12px'}}>
            <TranscriptEditor text={currentText} onChange={setCurrentText} />
          </div>
          <div style={{marginTop: '8px'}}>
            <ExportButton text={currentText} filename="transcript.txt" />
          </div>
        </div>
        <div>
          <div className="card dark">
            <TranscriptHistory history={history} onSelect={handleSelectHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TranscriptManagerPage;
