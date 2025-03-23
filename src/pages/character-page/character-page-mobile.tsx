import { useState } from 'react';
import { useCharacter } from './character-page';
import MobileCharacterStatus from './components/stats/status-mobile';
import CharacterSkills from './components/skills/character-skills';
import BottomSideBar from './components/ui/bottom-side-bar';
import CharacterInventory from './components/inventory/character-inventory';
import CharacterRituals from './components/rituals/character-rituals';
import CharacterAttacks from './components/attacks/character-attacks';
import CharacterFeats from './components/feats/character-feat';

export default function CharacterPageMobile() {
  const { character } = useCharacter();
  const [selectedOption, setSelectedOption] = useState('skills'); // Default to 'skills'
  const [isStatusOpen, setIsStatusOpen] = useState(false); // State for MobileCharacterStatus Sheet

  // Handle option click from BottomSideBar
  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId); // Set the selected option for other content
    setIsStatusOpen(false); // Close the Sheet when switching to other options
  };

  // Render the appropriate component based on the selected option (excluding 'character')
  const renderContent = () => {
    switch (selectedOption) {
      case 'inventory':
        return <CharacterInventory />; // Replace with actual component
      case 'skills':
        return <CharacterSkills />;
      case 'rituals':
        return <CharacterRituals />; // Replace with actual component
      case 'attacks':
        return <CharacterAttacks />; // Replace with actual component
      case 'feats':
        return <CharacterFeats />; // Replace with actual component
      default:
        return <CharacterSkills />; // Fallback to skills
    }
  };

  return (
    <div className="flex flex-col relative min-h-screen space-y-5">
      <div className="sm:px-10 w-full flex flex-col items-center justify-center flex-grow">{renderContent()}</div>
      <MobileCharacterStatus isOpen={isStatusOpen} setIsOpen={setIsStatusOpen} />
      <BottomSideBar onOptionClick={handleOptionClick} selectedOption={selectedOption} openCharacterSheet={setIsStatusOpen} />
    </div>
  );
}
