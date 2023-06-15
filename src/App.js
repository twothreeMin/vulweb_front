import './App.css';
import logo from './logo.svg';
import React, {useState, useEffect} from 'react';

function App() {
  const [message, setMessage] = useState(["test", "test2"]);

  useEffect(() => {
    fetch("/test")
        .then((response) => response.json())
        .then((json) => setMessage(json.SUCCESS_TEXT));
}, []);

  return (
    <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          {message}
      </header>
    </div>
  );
}

export default App;
