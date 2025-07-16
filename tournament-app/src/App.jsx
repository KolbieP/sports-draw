import { useState } from 'react'
import './App.css'

function App() {
  // State for number of pools
  const [numPools, setNumPools] = useState(2)

  // State for team names array
  const [teams, setTeams] = useState([''])

  // State for generated pools
  const [pools, setPools] = useState([])

  // Add a new empty team input field
  const addTeam = () => setTeams([...teams, ''])

  // Update a team name at given index
  const handleTeamChange = (index, value) => {
    const updated = [...teams]
    updated[index] = value
    setTeams(updated)
  }

  // Generate pools by shuffling and assigning teams
  const generatePools = () => {
    const filteredTeams = teams.filter(t => t.trim() !== '')
    if (filteredTeams.length === 0) {
      alert('Please enter at least one team')
      return
    }
    if (numPools < 1 || numPools > filteredTeams.length) {
      alert('Number of pools must be between 1 and number of teams')
      return
    }

    // Shuffle teams
    const shuffled = [...filteredTeams].sort(() => Math.random() - 0.5)
    // Create empty pools arrays
    const newPools = Array.from({ length: numPools }, () => [])
    // Distribute teams into pools
    shuffled.forEach((team, i) => {
      newPools[i % numPools].push(team)
    })
    setPools(newPools)
  }

  return (
    <div className="App" style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>Tournament Organizer</h1>

      <label>
        Number of Pools:
        <input
          type="number"
          min="1"
          max={teams.filter(t => t.trim() !== '').length || 1}
          value={numPools}
          onChange={e => setNumPools(Number(e.target.value))}
          style={{ marginLeft: 10, width: 50 }}
        />
      </label>

      <div style={{ marginTop: 20 }}>
        <h3>Teams:</h3>
        {teams.map((team, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Team #${idx + 1}`}
            value={team}
            onChange={e => handleTeamChange(idx, e.target.value)}
            style={{ display: 'block', marginBottom: 10, width: '100%', padding: 6 }}
          />
        ))}
        <button onClick={addTeam} style={{ marginTop: 10 }}>
          Add Team
        </button>
      </div>

      <button
        onClick={generatePools}
        style={{ marginTop: 20, padding: '10px 20px', fontSize: 16 }}
      >
        Generate Pools
      </button>

      {pools.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2>Pools</h2>
          {pools.map((pool, idx) => (
            <div key={idx} style={{ marginBottom: 20 }}>
              <h3>Pool {idx + 1}</h3>
              <ul>
                {pool.map(team => (
                  <li key={team}>{team}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
