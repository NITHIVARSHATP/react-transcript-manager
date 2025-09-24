import React, { useState } from "react";
import { calculateAccuracy } from "../utils/accuracyUtils";

function AccuracyEvaluator({ onResult }) {
  const [reference, setReference] = useState("The quick brown fox jumps over the lazy dog");
  const [hypothesis, setHypothesis] = useState("The quick brown fox jumps over the lazy cat");
  const [result, setResult] = useState({ accuracy: 91.67, wer: 8.33 });

const handleEvaluate = () => {
  const res = calculateAccuracy(reference, hypothesis);
  setResult(res);
  if (onResult) onResult(res);
};


  return (
    <div style={{padding: '0', borderRadius: '8px'}}>
      <h3 style={{margin: '0 0 12px 0', color: '#f5efe6'}}>🎯 Accuracy Evaluator</h3>
      <div style={{marginBottom: '15px'}}>
        <label style={{display: 'block', marginBottom: '5px', fontWeight: '700'}}>Reference Text:</label>
        <textarea
          rows="4" style={{width: '100%', padding: '10px', border: '1px solid rgba(11,58,102,0.06)', borderRadius: '6px', fontSize: '14px', background: '#fff8f0', color: '#0f1720'}}
          placeholder="Enter the correct/original transcript"
          value={reference} onChange={(e) => setReference(e.target.value)}
        />
      </div>
      <div style={{marginBottom: '15px'}}>
        <label style={{display: 'block', marginBottom: '5px', fontWeight: '700'}}>Hypothesis Text:</label>
        <textarea
          rows="4" style={{width: '100%', padding: '10px', border: '1px solid rgba(11,58,102,0.06)', borderRadius: '6px', fontSize: '14px', background: '#fff8f0', color: '#0f1720'}}
          placeholder="Enter the transcribed text to compare"
          value={hypothesis} onChange={(e) => setHypothesis(e.target.value)}
        />
      </div>
      <button onClick={handleEvaluate} 
        style={{padding: '10px 20px', backgroundColor: '#5b21b6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', marginBottom: '15px'}}>
        🧮 Calculate Accuracy
      </button>

      {result && (
        <div style={{padding: '15px', background: '#fff', border: '1px solid rgba(11,58,102,0.06)', borderRadius: '6px'}}>
          <p style={{margin: '5px 0', fontSize: '16px'}}><strong style={{color: '#4c1d95'}}>Accuracy:</strong> <span style={{color: '#166534', fontSize: '18px'}}>{result.accuracy}%</span></p>
          <p style={{margin: '5px 0', fontSize: '16px'}}><strong style={{color: '#4c1d95'}}>Word Error Rate:</strong> <span style={{color: '#7f1d1d'}}>{result.wer}%</span></p>
        </div>
      )}
    </div>
  );
}

export default AccuracyEvaluator;
