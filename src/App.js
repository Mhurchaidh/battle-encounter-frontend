import { useEffect, useState } from 'react';
import './App.css';
import Battleground from './components/Battleground';


function App() {
  const [encounter, setEncounter] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setEncounter(resp))
  }, [])

  const handleEncounterChange = (obj) => {
    setEncounter(obj)
  }

  return (
    <div className="App">
      <Battleground encounter={encounter} handleEncounterChange={handleEncounterChange}/>
    </div>
  );
}

export default App;
