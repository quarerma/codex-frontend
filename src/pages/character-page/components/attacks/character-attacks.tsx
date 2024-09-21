import { useCharacter } from '../../character-page';
import AttacksInfo from './attacks-info';

export default function CharacterAttacks() {
  const { character } = useCharacter();

  return (
    <div
      className="overflow-y-auto mt-2 flex flex-col space-y-1 max-h-[75vh]"
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {character.attacks.map((attack) => (
        <div key={attack.local_id}>
          <AttacksInfo attack={attack} />
        </div>
      ))}
    </div>
  );
}
