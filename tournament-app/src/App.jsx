import { useState } from 'react'
import './App.css'

function App() {

  const [numPools, setNumPools] = useState(2)
  const [teams, setTeams] = useState([''])
  const [pools, setPools] = useState([])
  const [brackets, setBrackets] = useState([])

  const addTeam = () => setTeams([...teams, ''])

  const removeTeam = (index) => {
    const updated = [...teams]
    updated.splice(index, 1)
    setTeams(updated)
  }

  const handleTeamChange = (index, value) => {
    const updated = [...teams]
    updated[index] = value
    setTeams(updated)
  }

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

    const shuffled = [...filteredTeams].sort(() => Math.random() - 0.5)

    const newPools = Array.from({ length: numPools }, () => [])

    shuffled.forEach((team, i) => {
      newPools[i % numPools].push(team)
    })
    setPools(newPools)
  }

  const createBrackets = () => {
    const newBrackets = pools.map(pool => {
      const shuffled = [...pool].sort(() => Math.random() - 0.5)
      const matches = []

      for (let i = 0; i < shuffled.length; i += 2) {
        const team1 = shuffled[i]
        const team2 = shuffled[i + 1] || 'BYE'
        matches.push([team1, team2])
      }
      return matches
    })
    setBrackets(newBrackets)
  }

  return (
    <div className="App" style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>Tournament Organizer</h1>
      <label>
        Number of Pools:
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={numPools}
          onChange={e => {
            const val = e.target.value
            if (/^\d*$/.test(val)) {
              setNumPools(Number(val || 0))
            }
          }}
          style={{ marginLeft: 10, width: 60, textAlign: 'center' }}
          placeholder="2"
        />
      </label>

      <div style={{ marginTop: 20 }}>
        <h3>Teams:</h3>
        {teams.map((team, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder={`Team #${idx + 1}`}
              value={team}
              onChange={e => handleTeamChange(idx, e.target.value)}
              style={{ flexGrow: 1, padding: 6 }}
            />
            <button
              onClick={() => removeTeam(idx)}
              style={{ backgroundColor: '#2a2a2a', color: 'white', padding: '6px 10px' }}
            >
              🗑
            </button>
          </div>
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
      {pools.length > 0 && (
        <button
          onClick={createBrackets}
          style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}
        >
          Create Bracket
        </button>
      )}
      {brackets.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2>Brackets</h2>
          {brackets.map((poolBracket, poolIdx) => (
            <div key={poolIdx} style={{ marginBottom: 40 }}>
              <h3>Pool {poolIdx + 1} Bracket</h3>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                {poolBracket.map((match, matchIdx) => (
                  <div
                    key={matchIdx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      maxWidth: '300px',
                      boxSizing: 'border-box',
                      padding: '10px 20px',
                      backgroundColor: '#2a2a2a',
                      borderRadius: 8,
                      borderLeft: '3px solid #3f87f5',
                      position: 'relative',
                    }}
                  >
                    <span>{match[0]}</span>
                    <span>vs</span>
                    <span>{match[1]}</span>
                    <div style={{
                      position: 'absolute',
                      height: '2px',
                      backgroundColor: '#3f87f5',
                      width: '100%',
                      top: '50%',
                      left: 0,
                      zIndex: -1,
                    }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
