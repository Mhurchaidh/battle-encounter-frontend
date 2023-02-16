import EnemyDetails from './EnemyDetails.js'
function EnemyHolder({enemies, setTarget, playerAttacking, setTargetSelected}) {

    const listedEnemies = enemies?.map(enemy => {
        return <EnemyDetails key={enemy.id} enemy={enemy} setTarget={setTarget} playerAttacking={playerAttacking} setTargetSelected={setTargetSelected}/>
    })

    return (
        <div className='enemyParty'>
            Enemy Party: {listedEnemies}
        </div>
    )
}

export default EnemyHolder;