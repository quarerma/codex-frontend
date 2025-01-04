export function rollDamage(dieRoll: string) {
  const parts = dieRoll.split('+').map((part) => part.trim());

  let result = 0;
  let index = 0;
  const results: { [key: number]: { die: string; rolls: number[] } } = {};

  parts.forEach((part) => {
    if (part.includes('d')) {
      const [dieAmount, dieType] = part.split('d').map(Number);
      results[index] = { die: part, rolls: [] };
      for (let i = 0; i < dieAmount; i++) {
        const roll = Math.floor(Math.random() * dieType + 1);
        results[index].rolls.push(roll);
        result += roll;
      }
      index++;
    } else {
      result += Number(part);
    }
  });

  return { total: result, details: results };
}

// Exemplo de uso
// Exemplo de uso
export function rollCheck(dieRoll: string) {
  const parts = dieRoll.split('+').map((part) => part.trim());

  let maxRoll = -Infinity;
  let index = 0;
  const results: { [key: number]: { die: string; rolls: number[] } } = {};
  const modifiers: number[] = [];

  parts.forEach((part) => {
    if (part.includes('d')) {
      const [dieAmount, dieType] = part.split('d').map(Number);

      results[index] = { die: part, rolls: [] };

      if (dieAmount === 0) {
        // Special case: Roll two dice, take the worst (lowest) roll
        const roll1 = Math.floor(Math.random() * dieType + 1);
        const roll2 = Math.floor(Math.random() * dieType + 1);
        const worstRoll = Math.min(roll1, roll2);
        results[index].rolls.push(roll1, roll2);
        if (worstRoll > maxRoll) {
          maxRoll = worstRoll;
        }
      } else {
        for (let i = 0; i < dieAmount; i++) {
          const roll = Math.floor(Math.random() * dieType + 1);
          results[index].rolls.push(roll);
          if (roll > maxRoll) {
            maxRoll = roll;
          }
        }
      }

      index++;
    } else {
      const modifier = Number(part);
      modifiers.push(modifier);
    }
  });

  maxRoll += modifiers.reduce((acc, mod) => acc + mod, 0);

  return { max: maxRoll, details: results };
}
