import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link } from "react-router-dom";

function App() {
  const [url,setUrl]=useState("");
  const [shrturl,setShrturl]=useState("");

  async function submit(){
    const server="http://localhost:5000/";
    const shortUrl=await fetch(server,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json' ,
        'url':url
      }
    }).then((data)=>data.json());

    setShrturl(server+shortUrl[0].shortenUrl);
  }
  
  return (
    <div className="App">
        <div className='inpContainer'>
        <TextField id="outlined-basic"
         style={{
          width:'70%',
          outline:'black'
         }}
         label="Enter the URL" variant="outlined" type='url'
         onInput={(e)=>setUrl(e.target.value)}
         required/>
         <Button variant="contained" onClick={submit}>Shorten URL</Button>
    </div>
      
       {shrturl && 
          <div className='optContainer'>
           {shrturl}
           <ContentCopyIcon className='copyBtn' onClick={() => {navigator.clipboard.writeText(shrturl)}} titleAccess='COPY'></ContentCopyIcon>
          </div>
        }
    </div>
  );
}

export default App;
