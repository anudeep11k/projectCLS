import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dancehalls(){
  const [halls, setHalls] = useState([]);
  const [q, setQ] = useState('');
  const [parish, setParish] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (parish) params.set('parish', parish);
    fetch(`/api/dancehalls?${params.toString()}`)
      .then(r => r.json()).then(setHalls);
  }, [q, parish]);

  return (
    <div style={{padding:16}}>
      <h1>Dancehalls</h1>
      <div style={{display:'flex', gap:8, margin:'8px 0'}}>
        <input placeholder="Search by name…" value={q} onChange={e=>setQ(e.target.value)} />
        <input placeholder="Filter by parish…" value={parish} onChange={e=>setParish(e.target.value)} />
      </div>
      <ul>
        {halls.map(h => (
          <li key={h.slug}>
            <Link to={`/dancehalls/${h.slug}`}>{h.name}</Link> {h.parish ? `— ${h.parish}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
