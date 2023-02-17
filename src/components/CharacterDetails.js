
function CharacterDetails({character, setInitiator, setPlayerAttacking, playerAttacking, onGraveyardChange}) {

    const handleCharacter = () => {
        setInitiator(character.id)
        setPlayerAttacking(true)
    }

    const handleAttackCancel = () => {
        setPlayerAttacking(false)
    }

    const handleKillCharacter = () => {
        // const config = {
        //     method: "PATCH",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify({isDead: !character.dead})
        // }
        // fetch(`http://localhost:9292/character/${character.id}`, config)
        // .then(resp => resp.json())
        // .then((resp) => {onGraveyardChange(resp)})
        onGraveyardChange(character)
    }

    return (
        <div className={`friendly-${character.character_class}`} >
            <button onClick={handleKillCharacter}>Kill</button>
            {character.name} - {character.character_class}
            <p>{`HP: ${character.health}/${character.max_health}`}</p>
            <p>{character.mag_attack !== 0 ? `Mag: ${character.mag_attack}` : `Phys: ${character.phys_attack}`}</p>
            {playerAttacking ? <button onClick={handleAttackCancel}>Cancel</button> : <button onClick={handleCharacter}>Attack</button>}
        </div>
    )
}

export default CharacterDetails