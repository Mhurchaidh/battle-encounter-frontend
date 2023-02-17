import { useState, useEffect } from 'react';
import CharacterHolder from './CharacterHolder.js';
import EnemyHolder from './EnemyHolder';

function Battleground() {

    const [initiator, setInitiator] = useState(0)
    const [target, setTarget] = useState(0)
    const [playerAttacking, setPlayerAttacking] = useState(false)
    const [battlegrounds, setBattlegrounds] = useState([])
    const [characters, setCharacters] = useState([])
    const [enemies, setEnemies] = useState([])
    const [graveyard, setGraveyard] = useState([])
    const [revive, setRevive] = useState(false)

    
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
            const deadCharacters = resp.characters.filter(character => character.dead === true)
            setGraveyard(deadCharacters)
        })
    }, [revive])
    
    const onGraveyardChange = (character) => {
        const config = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({isDead: !character.dead})
        }
        fetch(`http://localhost:9292/character/${character.id}`, config)
        .then(resp => resp.json())
        .then((resp) => {
            const aliveCharacters = characters.filter(char => char.id !== resp.id)
            const deadCharacters = characters.filter(char => char.id === resp.id)
            setCharacters(aliveCharacters)
            //setRevive(!revive)
            setGraveyard(deadCharacters)
        })
        .then(setRevive(!revive))
        // setCharacters(characters.filter(char => char.id !== response.id))
    }

    const onPlayerDelete = (char) => {
        fetch(`http://localhost:9292/character/${char.id}`, {method: "DELETE"})
        .then(resp => resp.json())
        .then(resp => {
            setCharacters(characters.filter(char => char.id !== resp.id))
        })
        .then(setRevive(false))
        .then()
    }
    
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
        fetch('http://localhost:9292/battlegrounds', config)
        .then(resp => resp.json())
        .then(resp => handleEncounterChange(resp))
        .then(setPlayerAttacking(false))
    }
    const handleEncounterChange = (enc) => {
        setBattlegrounds([...battlegrounds, enc])
        setEnemies(enemies.map(enemy => enemy.id === enc.enemy.id? enemy = enc.enemy : enemy))
    }
    
    const handleBattleReset = () => {
        fetch('http://localhost:9292/battleground/all', {method: "DELETE"})
        .then(resp => resp.json())
        .then(resp => {
            setBattlegrounds(resp.battlegrounds)
            setCharacters(resp.characters)
            setEnemies(resp.enemies)
        })
    }

    const listedSkirmishes = battlegrounds?.map(battle => {
        return <p key={battle.id}>{`${battle.created_at}: ${battle.skirmish_log}! - ${battle.health_change} Damage`}</p>
    })

    // const listedDeadCharacters = characters?.map(deadChar => deadChar.dead === true ? <div key={deadChar.id}>{deadChar.name}{<div><button onClick={() => onPlayerDelete(deadChar)}>Delete</button><button onClick={() => onGraveyardChange(deadChar)}>Revive</button></div>}</div> : null) 
    const listedDeadCharacters = graveyard.map(deadChar => <div key={deadChar.id}>{deadChar.name}{<div><button onClick={() => onPlayerDelete(deadChar)}>Delete</button><button onClick={() => onGraveyardChange(deadChar)}>Revive</button></div>}</div>) 

    return (
        <div className='gameboard'>
            <div className='battlefield'>
                <EnemyHolder enemies={enemies} 
                            setTarget={setTarget} 
                            playerAttacking={playerAttacking}
                            onAttackSubmit={onAttackSubmit}
                            />
            <div className='middlefield'>
                <div>
                    <h2>Graveyard</h2>
                    {listedDeadCharacters}
                </div>
                <div className='battleLog'>
                    <h3>Battle Log</h3>
                    {listedSkirmishes}
                </div>
            </div>
                                
                <CharacterHolder characters={characters} 
                                setInitiator={setInitiator} 
                                setPlayerAttacking={setPlayerAttacking} 
                                playerAttacking={playerAttacking}
                                onGraveyardChange={onGraveyardChange}
                                />
            </div>
                <button onClick={handleBattleReset}>Reset Battle</button>
        </div>
    )
}

export default Battleground;