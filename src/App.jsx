import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './index.css'

function App() {
   const [player, setPlayer] = useState({health : 100, attack : 10, wisdom : 2});
   const [enemy, setEnemy] = useState({health : 100, attack : 8});
   const [playerTurn, setTurn] = useState(true);
   const [gameLog, setLog] = useState('Game Started!');
   const [gameConditions, setConditions] = useState(false);

   const playerAttack = () => {
    if(!playerTurn) return;
    
    const newEnemyHealth = enemy.health - player.attack;
    setEnemy({...enemy, health : newEnemyHealth});
    setLog(`Player Attacked for ${player.attack}`);
    setTurn(false);
   };

   const playerHeal = () => {
    if(!playerTurn) return;

    const newPlayerHealth = player.health + player.wisdom;
    setPlayer({...player, health : newPlayerHealth});
    setLog(`Player Healed for ${player.wisdom}`);
    setTurn(false);
   };

    setTimeout(() => {
      if (enemy.health > 0){
        enemyTurn();
      }
      checkWinCondition(enemy.health, player.health)
    }, 1000);
  

    const enemyTurn = () => {
      if(playerTurn) return;

      const newPlayerHealth = player.health - enemy.attack;
      setPlayer({...player, health : newPlayerHealth});
      setLog(`Enemy Attacked for ${enemy.attack}`);
      setTurn(true);
    };

    const checkWinCondition = (enemyHealth, playerHealth) =>{
      if (playerHealth <= 0){
        setLog('You lost!');
        setConditions(true);
      } else if (enemyHealth <= 0){
        setLog('You win!');
        setConditions(true);
      }
    };

  return (
    <>
      <div id="game">
        <div id="player">
          <h2>Player</h2>
          <p>Health: <span id="player-health">{player.health}</span></p>
          <button onClick={playerAttack} disabled={!playerTurn, gameConditions} id="attack-button">Attack</button>
          <button onClick={playerHeal} disabled={!playerTurn, gameConditions} id="heal-button">Heal</button>
        </div>
      
        <div id="enemy">
          <h2>Enemy</h2>
          <p>Health: <span id="enemy-health">{enemy.health}</span></p>
        </div>
      
        <p id="game-log">{gameLog}</p>
      </div>
    </>
  )
}

export default App
