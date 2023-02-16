import { useState } from 'react';
import CharacterHolder from './CharacterHolder.js';
import EnemyHolder from './EnemyHolder';

function Battleground({encounter, handleEncounterChange}) {

    const [initiator, setInitiator] = useState(0)
    const [target, setTarget] = useState(0)
    const [playerAttacking, setPlayerAttacking] = useState(false)
    // const [targetSelected, setTargetSelected] = useState(false)

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
        fetch('http://localhost:9292', config)
        .then(resp => resp.json())
        .then((resp) => {handleEncounterChange(resp)})
        .then(setPlayerAttacking(false))
    }

    const handleBattleReset = () => {
        fetch('http://localhost:9292', {method: "DELETE"})
        .then(resp => resp.json())
        .then(resp => handleEncounterChange(resp))
    }

    const listedSkirmishes = encounter.battlegrounds?.map(battle => {
        return <p key={battle.id}>{`${battle.created_at}: ${battle.skirmish_log}! - ${battle.health_change} Damage`}</p>
    })

    return (
        <div className='gameboard'>
            <div className='battlefield'>
                <EnemyHolder enemies={encounter.enemies} 
                            setTarget={setTarget} 
                            playerAttacking={playerAttacking}
                            onAttackSubmit={onAttackSubmit}
                            />
            <div className='battleLog'>
                {listedSkirmishes}
            </div>
                                
                <CharacterHolder characters={encounter.characters} 
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