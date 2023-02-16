import EnemyDetails from './EnemyDetails.js'
function EnemyHolder({enemies, setTarget, playerAttacking, onAttackSubmit}) {

    const listedEnemies = enemies?.map(enemy => {
        return enemy.dead === false ? <EnemyDetails key={enemy.id} 
                                                    enemy={enemy} 
                                                    setTarget={setTarget} 
                                                    playerAttacking={playerAttacking} 
                                                    onAttackSubmit={onAttackSubmit}/> : null
    })

    return (
        <div className='enemyParty'>
            Enemy Party: {listedEnemies}
        </div>
    )
}

export default EnemyHolder;