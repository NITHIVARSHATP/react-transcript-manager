import React, { useState, useMemo } from "react";
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

  const keywords = useMemo(() => {
    if (!currentText) return [];
    const stopwords = new Set([
      'the','and','for','that','this','with','you','are','was','were','have','has','had','not','but','from','they','their','them','your','will','what','when','where','which','who','whom','been','being','use','uses','used','useful','a','an','in','on','of','to','is','it','as','at','by','be','or','we','i'
    ]);
    const words = (currentText || '').toLowerCase().match(/\b[a-z]+\b/g) || [];
    const freq = {};
    words.forEach((w) => {
      if (w.length < 3) return;
      if (stopwords.has(w)) return;
      freq[w] = (freq[w] || 0) + 1;
    });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([word, count]) => ({ word, count }));
  }, [currentText]);

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
          <div className="card" style={{marginTop: '12px'}}>
            <h3 style={{marginTop: 0}}>🔎 Keywords</h3>
            {keywords.length === 0 ? (
              <p style={{color: '#888', fontStyle: 'italic'}}>No keywords yet. Paste or upload a transcript.</p>
            ) : (
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                {keywords.map((k) => (
                  <span key={k.word} style={{background: '#eef6ff', border: '1px solid #d0e6ff', padding: '6px 10px', borderRadius: '999px', fontSize: '13px', color: '#0b3a66'}}>
                    {k.word} <small style={{marginLeft: '8px', color: '#4378a8'}}>&times;{k.count}</small>
                  </span>
                ))}
              </div>
            )}
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
