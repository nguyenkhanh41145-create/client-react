import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Server connecting...')

  useEffect(() => {
    // URL RENDER
    const serverUrl = 'https://server-api-1-4i16.onrender.com/'; 

    fetch(serverUrl)
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => {
        console.error("ERROR:", err);
        setMessage('Can not connect to the server. Please check the URL.');
      });
  }, [])

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Connect ReactJS with Express successfully!</h1>
      <p>Data from Server: <strong>{message}</strong></p>
    </div>
  )
}

export default App