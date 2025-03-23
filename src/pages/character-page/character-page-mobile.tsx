import { useState } from 'react';
import { useCharacter } from './character-page';
import MobileCharacterStatus from './components/stats/status-mobile';
import CharacterSkills from './components/skills/character-skills';
import BottomSideBar from './components/ui/bottom-side-bar';

export default function CharacterPageMobile() {
  const { character } = useCharacter();
  const [selectedOption, setSelectedOption] = useState('skills'); // Default to 'skills'
  const [isStatusOpen, setIsStatusOpen] = useState(false); // State for MobileCharacterStatus Sheet

  // Handle option click from BottomSideBar
  const handleOptionClick = (optionId) => {
    if (optionId === 'character') {
      setIsStatusOpen(true); // Open the Sheet when 'character' is clicked
    } else {
      setSelectedOption(optionId); // Set the selected option for other content
      setIsStatusOpen(false); // Close the Sheet when switching to other options
    }
  };

  // Render the appropriate component based on the selected option (excluding 'character')
  const renderContent = () => {
    switch (selectedOption) {
      case 'inventory':
        return <div className="text-white">Inventory Component</div>; // Replace with actual component
      case 'skills':
        return <CharacterSkills />;
      case 'rituals':
        return <div className="text-white">Rituals Component</div>; // Replace with actual component
      case 'attacks':
        return <div className="text-white">Attacks Component</div>; // Replace with actual component
      default:
        return <CharacterSkills />; // Fallback to skills
    }
  };

  return (
    <div className="flex flex-col w-full relative min-h-screen space-y-5">
      <div className="sm:px-10 w-full flex flex-col items-center justify-center flex-grow">{renderContent()}</div>
      <MobileCharacterStatus isOpen={isStatusOpen} setIsOpen={setIsStatusOpen} />
      <BottomSideBar onOptionClick={handleOptionClick} />
    </div>
  );
}
