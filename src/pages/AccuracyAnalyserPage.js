import React, { useState } from "react";
import AccuracyEvaluator from "../components/AccuracyEvaluator";
import AccuracyChart from "../components/AccuracyChart";

function AccuracyAnalyserPage() {
  const [accuracyData, setAccuracyData] = useState(() => {
    try { const raw = localStorage.getItem('tt_accuracy'); if (raw) return JSON.parse(raw); } catch(e) {}
    return [
      { test: "Meeting Transcript", accuracy: 92.3 },
      { test: "Interview Recording", accuracy: 87.8 },
      { test: "Lecture Audio", accuracy: 95.1 },
      { test: "Phone Call", accuracy: 78.5 }
    ];
  });

  const handleNewResult = (result) => {
    setAccuracyData((prev) => {
      const next = [
        ...prev,
        { test: `Test ${prev.length + 1}`, accuracy: result.accuracy },
      ];
      try { localStorage.setItem('tt_accuracy', JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  return (
    <div className="page">
      <h2 style={{textAlign: 'center', marginBottom: '22px'}}>📊 Accuracy Analyser</h2>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px'}}>
        <div className="card dark">
          <AccuracyEvaluator onResult={handleNewResult} />
        </div>
        <div className="card dark">
          <AccuracyChart data={accuracyData} />
        </div>
      </div>
    </div>
  );
}

export default AccuracyAnalyserPage;
