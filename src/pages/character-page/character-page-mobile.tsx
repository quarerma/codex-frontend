import { useCharacter } from './character-page';
import MobileCharacterStatus from './components/stats/status-mobile';
import CharacterSkills from './skills/character-skills';

export default function CharacterPageMobile() {
  const { character } = useCharacter();

  return (
    <div>
      <div className="sm:px-10 px-3">
        <CharacterSkills />
      </div>
      <MobileCharacterStatus />
    </div>
  );
}
