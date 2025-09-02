import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(){
  return (
    <nav style={{padding:'12px 16px', borderBottom:'1px solid #eee', display:'flex', gap:12, flexWrap:'wrap'}}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/dancehalls">Dancehalls</Link>
      <Link to="/map">Map</Link>
      <Link to="/lets-dance">Let’s Dance!</Link>
      <Link to="/film">Film</Link>
      <Link to="/links">Links</Link>
      <Link to="/look-and-listen">Look &amp; Listen</Link>
      <Link to="/your-story">Your Story</Link>
    </nav>
  );
}
