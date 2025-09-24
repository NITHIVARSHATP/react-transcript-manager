import React, { useMemo, useState } from "react";

function ReportsPage() {
  const reports = [
    { title: 'Weekly Summary', id: 1 },
    { title: 'Monthly Accuracy', id: 2 },
    { title: 'Export Logs', id: 3 }
  ];

  const history = useMemo(() => {
    try { const raw = localStorage.getItem('tt_history'); if (raw) return JSON.parse(raw); } catch(e) {}
    return [];
  }, []);

  const accuracy = useMemo(() => {
    try { const raw = localStorage.getItem('tt_accuracy'); if (raw) return JSON.parse(raw); } catch(e) {}
    return [];
  }, []);

  const generateJSON = () => {
    const payload = { generatedAt: new Date().toISOString(), history, accuracy };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `transcript-report-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url);
  };

  const generateCSV = () => {
    // simple CSV: type, title, value
    const rows = [['type','title','value']];
    history.forEach((h, i) => rows.push(['history', `item${i+1}`, `"${h.replace(/"/g, '""')}"`]));
    accuracy.forEach((a, i) => rows.push(['accuracy', a.test || `test${i+1}`, a.accuracy]));
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `transcript-report-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  // interactive report preview / generation
  const [selectedReport, setSelectedReport] = useState(null);
  const [preview, setPreview] = useState(null);

  const downloadBlob = (filename, content, mime) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
  };

  const toCSV = (obj) => {
    if (!obj) return '';
    // if array of objects -> headers from keys
    if (Array.isArray(obj)) {
      const keys = Array.from(obj.reduce((s,o)=>{ Object.keys(o||{}).forEach(k=>s.add(k)); return s; }, new Set()));
      const rows = [keys.join(',')].concat(obj.map(o => keys.map(k=>`"${String((o||{})[k] ?? '').replace(/"/g,'""')}"`).join(',')));
      return rows.join('\n');
    }
    // otherwise flatten to key,value pairs
    return Object.entries(obj).map(([k,v])=>`"${k}","${String(v).replace(/"/g,'""')}"`).join('\n');
  };

  const handleReport = (type) => {
    setSelectedReport(type);
    const now = new Date().toISOString();
    if (type === 'weekly') {
      const recent = history.slice(-7);
      const avgAcc = accuracy.length ? (accuracy.reduce((s,a)=>s+a.accuracy,0)/accuracy.length).toFixed(2) : 'N/A';
      const payload = { type: 'weekly-summary', generatedAt: now, recentTranscripts: recent, historyCount: history.length, accuracyCount: accuracy.length, averageAccuracy: avgAcc };
      setPreview(payload);
    } else if (type === 'monthly') {
      const avg = accuracy.length ? (accuracy.reduce((s,a)=>s+a.accuracy,0)/accuracy.length) : 0;
      const top = accuracy.slice().sort((a,b)=>b.accuracy-a.accuracy).slice(0,5);
      const payload = { type: 'monthly-accuracy', generatedAt: now, averageAccuracy: avg ? Number(avg.toFixed(2)) : 'N/A', topEntries: top };
      setPreview(payload);
    } else if (type === 'export') {
      const payload = { type: 'export-logs', generatedAt: now, history, accuracy };
      setPreview(payload);
    }
  };

  return (
    <div className="page">
      <h2 style={{textAlign: 'center', marginBottom: '22px'}}>📑 Reports</h2>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start'}}>
        <div className="card dark">
          <h3 style={{marginTop: 0, color: '#f5efe6'}}>Available Reports</h3>
          <div>
            <button onClick={() => handleReport('weekly')} style={{width: '100%', padding: '8px', marginBottom: '8px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'left'}}>Weekly Summary</button>
            <button onClick={() => handleReport('monthly')} style={{width: '100%', padding: '8px', marginBottom: '8px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'left'}}>Monthly Accuracy</button>
            <button onClick={() => handleReport('export')} style={{width: '100%', padding: '8px', marginBottom: '8px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'left'}}>Export Logs</button>
          </div>
        </div>
        <div className="card" style={{display: 'flex', flexDirection: 'column'}}>
          <h3 style={{marginTop: 0}}>Quick Actions</h3>
          <div style={{display: 'grid', gap: '8px'}}>
            <div style={{color: '#333'}}>History items: <strong>{history.length}</strong></div>
            <div style={{color: '#333'}}>Accuracy entries: <strong>{accuracy.length}</strong></div>
            <button onClick={generateJSON} style={{width: '100%', padding: '10px', backgroundColor: '#6d28d9', color: 'white', borderRadius: '8px', border: 'none'}}>Download All JSON</button>
            <button onClick={generateCSV} style={{width: '100%', padding: '10px', backgroundColor: '#8338ec', color: 'white', borderRadius: '8px', border: 'none'}}>Download All CSV</button>
            {preview && (
              <div style={{marginTop: '12px', padding: '10px', border: '1px solid #eee', borderRadius: '8px', background: '#fff', overflow: 'hidden'}}>
                <h4 style={{margin: '0 0 8px 0'}}>Preview: {selectedReport}</h4>
                <pre style={{maxHeight: '200px', overflow: 'auto', fontSize: '12px', whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>{JSON.stringify(preview, null, 2)}</pre>
                <div style={{display: 'flex', gap: '8px', marginTop: '8px'}}>
                  <button onClick={() => downloadBlob(`report-${selectedReport}-${Date.now()}.json`, JSON.stringify(preview, null, 2), 'application/json')} style={{flex:1, padding: '8px', background:'#6d28d9', color:'#fff', borderRadius: '6px', border:'none'}}>Download Report JSON</button>
                  <button onClick={() => downloadBlob(`report-${selectedReport}-${Date.now()}.csv`, toCSV(Array.isArray(preview) ? preview : (preview.topEntries || preview.recentTranscripts || [])), 'text/csv')} style={{flex:1, padding: '8px', background:'#8338ec', color:'#fff', borderRadius: '6px', border:'none'}}>Download Report CSV</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
