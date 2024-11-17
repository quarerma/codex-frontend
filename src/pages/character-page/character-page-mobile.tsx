import { useCharacter } from './character-page';
import MobileCharacterStatus from './components/stats/status-mobile';

export default function CharacterPageMobile() {
  const { character } = useCharacter();

  return (
    <div>
      <h1>{character.name}</h1>
      <p>{character.level}</p>
      <MobileCharacterStatus />
    </div>
  );
}
