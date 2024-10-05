export function rollDie(dieRoll: string) {
  const parts = dieRoll.split('+').map((part) => part.trim());

  let result = 0;
  let index = 0;
  const results: { [key: number]: { die: string; rolls: number[] } } = {};

  parts.forEach((part) => {
    if (part.includes('d')) {
      console.log('dado', part);
      const [dieAmount, dieType] = part.split('d').map(Number);
      results[index] = { die: part, rolls: [] };
      for (let i = 0; i < dieAmount; i++) {
        const roll = Math.floor(Math.random() * dieType + 1);
        results[index].rolls.push(roll);
        result += roll;
      }
      index++;
    } else {
      console.log('modfier', part);
      result += Number(part);
    }
  });

  return { total: result, details: results };
}

// Exemplo de uso
console.log(rollDie('3d6 + 3d6 + 2d6 + 10 + 2d8'));
