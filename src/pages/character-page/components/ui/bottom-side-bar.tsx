import { Menu, Sword, Book, FlaskConical, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { BsMagic } from 'react-icons/bs';

export default function BottomSideBar({ onOptionClick, selectedOption, openCharacterSheet }) {
  const options = [
    { name: 'Skills', icon: <Book size={24} />, id: 'skills' },
    { name: 'Feats', icon: <BsMagic size={24} />, id: 'feats' },
    { name: 'Inventory', icon: <Shield size={24} />, id: 'inventory' },
    { name: 'Rituals', icon: <FlaskConical size={24} />, id: 'rituals' },
    { name: 'Attacks', icon: <Sword size={24} />, id: 'attacks' },
  ];

  const characterOption = { name: 'Character', icon: <Users size={24} />, id: 'character' };

  const handleClick = (optionId) => {
    if (onOptionClick) {
      onOptionClick(optionId);
    }
  };

  return (
    <>
      <div className="h-[50px] bottom-0"></div>
      <div className="h-[50px] fixed bottom-0 bg-dark-bg-secondary border-t border-primary w-full -ml-5 flex items-center sm:px-10 px-5">
        <div className="flex justify-between w-full">
          {/* Character button separated */}
          <button onClick={() => openCharacterSheet(true)} className={` transition-colors flex-1 ${selectedOption === 'character' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
            {characterOption.icon}
          </button>

          {/* Other options */}
          {options.map((option) => (
            <button key={option.id} onClick={() => handleClick(option.id)} className={` flex-1 ${selectedOption === option.id ? 'text-primary' : 'text-foreground/70 hover:text-foreground  '}`}>
              {option.icon}
            </button>
          ))}

          {/* Hamburger menu */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" className="p-0">
                <Menu size={24} className="text-foreground/70 hover:text-foreground" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-dark-bg-secondary border-t border-gray-700">
              <div className="flex flex-col p-4 space-y-4 text-nowrap whitespace-nowrap">
                {/* Character option in drawer */}
                <button
                  onClick={() => openCharacterSheet(true)}
                  className={`flex items-center space-x-2   transition-colors ${selectedOption === 'character' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
                >
                  {characterOption.icon}
                  <span className="font-semibold tracking-wider">{characterOption.name}</span>
                </button>

                {/* Other options in drawer */}
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleClick(option.id)}
                    className={`flex items-center space-x-2  transition-colors ${selectedOption === option.id ? 'text-primary' : 'text-white/70 hover:text-white'}`}
                  >
                    {option.icon}
                    <span className="font-semibold tracking-wider">{option.name}</span>
                  </button>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
}
