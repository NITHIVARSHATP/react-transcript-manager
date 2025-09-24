import React from "react";

function ReportsPage() {
  const reports = [
    { title: 'Weekly Summary', id: 1 },
    { title: 'Monthly Accuracy', id: 2 },
    { title: 'Export Logs', id: 3 }
  ];

  return (
    <div className="page">
      <h2 style={{textAlign: 'center', marginBottom: '22px'}}>📑 Reports</h2>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px'}}>
        <div className="card dark">
          <h3 style={{marginTop: 0, color: '#f5efe6'}}>Available Reports</h3>
          <div>
            {reports.map((r) => (
              <button key={r.id} style={{width: '100%', padding: '8px', marginBottom: '8px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'left'}}>
                {r.title}
              </button>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 style={{marginTop: 0}}>Quick Actions</h3>
          <button style={{width: '100%', padding: '10px', backgroundColor: '#6d28d9', color: 'white', borderRadius: '8px', border: 'none'}}>Generate Report</button>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
