import { useState } from "react"
function EnemyDetails({enemy, setTarget, playerAttacking, onAttackSubmit}) {
    const [targetSelected, setTargetSelected] = useState(false)


    const handleAttack = () => {
        setTarget(enemy.id)
        setTargetSelected(true)
    }

    const handleAttackConfirm = () => {
        onAttackSubmit()
        setTargetSelected(false)
    }

    return (
        <div className={`enemy-${enemy.enemy_class}`}>
            {enemy.name} - {enemy.enemy_class}
            <p>{enemy.mag_attack !== 0 ? `Mag: ${enemy.mag_attack}` : `Phys: ${enemy.phys_attack}`}</p>
            <p>{`HP: ${enemy.health}/${enemy.max_health}`}</p>
            {playerAttacking? targetSelected? <button className='confirm' onClick={handleAttackConfirm}>Confirm</button> : <button onClick={handleAttack}>Select</button> : null}
        </div>
    )
}

export default EnemyDetails;