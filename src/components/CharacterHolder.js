import CharacterDetails from './CharacterDetails.js'
function CharacterHolder({characters, setInitiator, setPlayerAttacking, playerAttacking}) {

    const listedCharacters = characters?.map(character => {
        return <CharacterDetails key={character.id} character={character} setInitiator={setInitiator} setPlayerAttacking={setPlayerAttacking} playerAttacking={playerAttacking}/>
    })

    return (
        <div className='party'>
            Party: {listedCharacters}
        </div>
    )
}

export default CharacterHolder;