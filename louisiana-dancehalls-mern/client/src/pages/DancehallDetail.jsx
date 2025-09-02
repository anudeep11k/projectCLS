import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DancehallDetail() {
  const { slug } = useParams();
  const [hall, setHall] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/dancehalls/${slug}`)
      .then(r => r.json())
      .then(data => setHall(data.result || data)) // handle {result:{}} or direct doc
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div style={{padding:20}}>Loading…</div>;
  if (!hall) return <div style={{padding:20}}>Not found.</div>;

  return (
    <div style={{padding:20}}>
      <h1>{hall.name}</h1>
      {hall.parish && <p><b>Parish:</b> {hall.parish}</p>}
      {hall.status && <p><b>Status:</b> {hall.status}</p>}
      {hall.description_html && (
        <article dangerouslySetInnerHTML={{__html: hall.description_html}} />
      )}
    </div>
  );
}
