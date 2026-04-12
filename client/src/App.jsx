import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
  fetch('/api/test')
    .then(res => res.json())
    .then(data => console.log(data));
  }, []); 

  return (
    <>
      <section id="center">
        
      </section>
    </>
  )
}

export default App
