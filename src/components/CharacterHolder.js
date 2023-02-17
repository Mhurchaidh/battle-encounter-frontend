import CharacterDetails from './CharacterDetails.js'
function CharacterHolder({characters, setInitiator, setPlayerAttacking, playerAttacking, onGraveyardChange}) {

    const listedCharacters = characters?.map(character => {
        return character.dead === false ? <CharacterDetails key={character.id} 
                                 character={character} 
                                 setInitiator={setInitiator} 
                                 setPlayerAttacking={setPlayerAttacking} 
                                 playerAttacking={playerAttacking}
                                 onGraveyardChange={onGraveyardChange}
                                 /> : null
    })

    return (
        <div className='party'>
            Party: {listedCharacters}
        </div>
    )
}

export default CharacterHolder;