import React, { useState } from 'react';

export default function YourStory(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', dancehall:'', story_text:'' });
  const [sent, setSent] = useState(false);

  function onChange(e){ setForm(f => ({...f, [e.target.name]: e.target.value})) }
  async function submit(e){
    e.preventDefault();
    const r = await fetch('/api/stories', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    if (r.ok) setSent(true);
  }

  if (sent) return <div style={{padding:16}}>Thanks for your story!</div>;

  return (
    <form onSubmit={submit} style={{padding:16, display:'grid', gap:8, maxWidth:560}}>
      <h1>Your Story</h1>
      <input name="name" placeholder="Name*" required onChange={onChange}/>
      <input name="email" placeholder="Email*" type="email" required onChange={onChange}/>
      <input name="phone" placeholder="Phone" onChange={onChange}/>
      <input name="dancehall" placeholder="Dance Hall*" required onChange={onChange}/>
      <textarea name="story_text" placeholder="Your story…" rows="6" onChange={onChange}/>
      <button>Submit</button>
    </form>
  );
}
