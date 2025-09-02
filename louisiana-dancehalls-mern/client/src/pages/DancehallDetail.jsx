import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DancehallDetail(){
  const { slug } = useParams();
  const [hall, setHall] = useState(null);

  useEffect(() => {
    fetch(`/api/dancehalls/${slug}`).then(r=>r.json()).then(setHall);
  }, [slug]);

  if (!hall) return <div style={{padding:16}}>Loading…</div>;

  return (
    <div style={{padding:16}}>
      <h1>{hall.name}</h1>
      {hall.parish && <p><strong>Parish:</strong> {hall.parish}</p>}
      {hall.status && <p><strong>Status:</strong> {hall.status}</p>}
      <div dangerouslySetInnerHTML={{__html: hall.description_html}} />
      {Array.isArray(hall.images) && hall.images.length > 0 && (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:8, marginTop:8}}>
          {hall.images.map((img, i) => (
            <figure key={i}><img src={img.url} alt={img.caption||hall.name} style={{width:'100%'}} /><figcaption>{img.caption}</figcaption></figure>
          ))}
        </div>
      )}
    </div>
  );
}
