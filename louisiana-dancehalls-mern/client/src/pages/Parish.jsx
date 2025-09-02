import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Parish() {
  const { parishSlug } = useParams();
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // try query by parish; your API expects ?parish=<name>
    fetch(`/api/dancehalls?parish=${encodeURIComponent(parishSlug || "")}`)
      .then(r => r.json())
      .then(data => {
        // support both {results: []} or [] depending on your route
        const list = Array.isArray(data) ? data : (data.results || []);
        setHalls(list);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [parishSlug]);

  return (
    <div style={{padding: 20}}>
      <h1>Parish: {parishSlug}</h1>
      {loading ? <p>Loading…</p> : (
        halls.length ? (
          <ul>
            {halls.map(h => <li key={h._id || h.slug}>{h.name}</li>)}
          </ul>
        ) : <p>No dancehalls found for this parish.</p>
      )}
    </div>
  );
}
