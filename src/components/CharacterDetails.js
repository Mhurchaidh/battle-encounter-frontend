
function CharacterDetails({character, setInitiator, setPlayerAttacking, playerAttacking}) {

    const handleCharacter = () => {
        setInitiator(character.id)
        setPlayerAttacking(true)
    }

    const handleAttackCancel = () => {
        setPlayerAttacking(false)
    }

    return (
        <div className={`friendly-${character.character_class}`} >
            {character.name} - {character.character_class}
            <p>{character.mag_attack !== 0 ? `Mag:${character.mag_attack}` : `Phys: ${character.phys_attack}`}</p>
            {playerAttacking ? <button onClick={handleAttackCancel}>Cancel</button> : <button onClick={handleCharacter}>Attack</button>}
            
        </div>
    )
}

export default CharacterDetails