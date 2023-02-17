import { useState, useEffect } from 'react';
import CharacterHolder from './CharacterHolder.js';
import EnemyHolder from './EnemyHolder';

function Battleground() {

    const [initiator, setInitiator] = useState(0)
    const [target, setTarget] = useState(0)
    const [playerAttacking, setPlayerAttacking] = useState(false)
    //const [encounter, setEncounter] = useState({})
    const [battlegrounds, setBattlegrounds] = useState([])
    const [characters, setCharacters] = useState([])
    const [enemies, setEnemies] = useState([])

    useEffect(() => {
        fetch('http://localhost:9292', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        })
        .then(resp => resp.json())
        .then(resp => {
            setBattlegrounds(resp.battlegrounds)
            setCharacters(resp.characters)
            setEnemies(resp.enemies)
        })
    }, [])

    
    const onAttackSubmit = () => {
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                initiatorID: initiator,
                targetID: target,
                characterAttacking: playerAttacking
            }
            )
        }
        fetch('http://localhost:9292/battlegrounds/new', config)
        .then(resp => resp.json())
        .then(resp => handleEncounterChange(resp))
        .then(setPlayerAttacking(false))
    }
    const handleEncounterChange = (enc) => {
        setBattlegrounds([...battlegrounds, enc])
        setEnemies(enemies.map(enemy => enemy.id === enc.enemy.id? enemy = enc.enemy : enemy))
    }
    
    const handleBattleReset = () => {
        fetch('http://localhost:9292/battlegrounds/all', {method: "DELETE"})
        .then(resp => resp.json())
        .then(resp => {
            setBattlegrounds(resp.battlegrounds)
            setEnemies(resp.enemies)
        })
    }

    const listedSkirmishes = battlegrounds?.map(battle => {
        return <p key={battle.id}>{`${battle.created_at}: ${battle.skirmish_log}! - ${battle.health_change} Damage`}</p>
    })

    return (
        <div className='gameboard'>
            <div className='battlefield'>
                <EnemyHolder enemies={enemies} 
                            setTarget={setTarget} 
                            playerAttacking={playerAttacking}
                            onAttackSubmit={onAttackSubmit}
                            />
            <div className='battleLog'>
                {listedSkirmishes}
            </div>
                                
                <CharacterHolder characters={characters} 
                                setInitiator={setInitiator} 
                                setPlayerAttacking={setPlayerAttacking} 
                                playerAttacking={playerAttacking}
                                />
            </div>
                <button onClick={handleBattleReset}>Reset Battle</button>
        </div>
    )
}

export default Battleground;