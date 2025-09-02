import React, { useEffect, useState } from 'react';

export default function About(){
  const [page, setPage] = useState(null);
  useEffect(() => { fetch('/api/pages/about').then(r=>r.json()).then(setPage); }, []);
  if (!page) return <div style={{padding:16}}>Loading…</div>;
  return <div style={{padding:16}} dangerouslySetInnerHTML={{__html: page.content_html}} />;
}
