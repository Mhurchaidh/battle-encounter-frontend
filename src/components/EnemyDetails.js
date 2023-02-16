function EnemyDetails({enemy, setTarget, playerAttacking, setTargetSelected}) {

    const handleAttack = () => {
        setTarget(enemy.id)
        setTargetSelected(true)
    }

    return (
        <div className={`enemy-${enemy.enemy_class}`}>
            {enemy.name} - {enemy.enemy_class}
            <p>Health: {enemy.health}</p>
            {playerAttacking? <button onClick={handleAttack}>Select</button> : null}
        </div>
    )
}

export default EnemyDetails;