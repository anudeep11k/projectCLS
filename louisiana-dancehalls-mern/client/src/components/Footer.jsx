import React from 'react';
export default function Footer(){
  return (
    <footer style={{marginTop:24, padding:16, borderTop:'1px solid #eee', color:'#666', fontSize:14}}>
      © {new Date().getFullYear()} Louisiana Dance Halls
    </footer>
  );
}
