const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 16;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let battleLog = [];

//Using throw keyword to throw error if you enter wrong thing..
function getMaxLifeValues() {
  const enterValueForLife = prompt(
    "Please enter Maximum life for you and moster",
    "100"
  );
  const parsedValue = parseInt(enterValueForLife);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: "Invalid user input, not a number!!" };
  }
  return parsedValue;
}

let chosenMaxLife;
//Using try catch block to throw error if you entered wrong..
try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert(
    "You have enter wrong thinh, by default 100 was used. Enjoy your game !!"
  );
} 

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function logInfo(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    eventOccured: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  //Replacing if-else statement codes to switch case statement
  //It will also works same as the if-else
  switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK:
      let logEntry = {
        eventOccured: ev,
        value: val,
        target: "MONSTER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: "MONSTER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: ev,
        value: val,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: ev,
        value: val,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    default:
      logEntry = {};
  }

  // if (ev === LOG_EVENT_PLAYER_ATTACK) {
  //   let logEntry = {
  //     eventOccured: ev,
  //     value: val,
  //     target: "MONSTER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth,
  //   };
  // } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: "MONSTER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth,
  //   };
  // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: "PLAYER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth,
  //   };
  // } else if (ev === LOG_EVENT_PLAYER_HEAL) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: "PLAYER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth,
  //   };
  // } else if (ev === LOG_EVENT_GAME_OVER) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: "PLAYER",
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth,
  //   };
  // }
  battleLog.push(logEntry);
}

function reset() {
  let currentMonsterHealth = chosenMaxLife;
  let currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  logInfo(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You have used your bonus life !!");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won !!");
    logInfo(
      LOG_EVENT_GAME_OVER,
      "PLAYER WIN",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lose!!");
    logInfo(
      LOG_EVENT_GAME_OVER,
      "MONSTER WIN",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("Drow match !!!");
    logInfo(
      LOG_EVENT_GAME_OVER,
      "DRAW MATCH",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  if (mode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  logInfo(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function attackHandler() {
  attackMonster("ATTACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal more than your max health !!");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
  console.log("balaram");
}

function printLogHandler() {
  let i = 0;
  for (const logEntry of battleLog) {
    console.log(`#${i}`);
    for (const key in logEntry) {
      console.log(`${key} => ${logEntry[key]}`);
    }
    i++;
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
