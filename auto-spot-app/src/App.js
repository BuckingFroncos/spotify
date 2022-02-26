import './App.css';
import React, {useState, useEffect} from 'react';
//import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  const [data, setData] = useState ([{}])

  useEffect(() => {
    fetch("/test").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      {(typeof data.members === 'undefined') ? (
        <p>Loading...</p>
      ) : (
          data.members.map((member, i) => (
              <p key={i}>{member}</p>
          ))
      )}
    </div>
  );
}

export default App;
