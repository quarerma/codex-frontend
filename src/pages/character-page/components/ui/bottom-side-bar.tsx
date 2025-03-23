import { Menu, Sword, Book, FlaskConical, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui Button
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'; // Assuming shadcn/ui Drawer

export default function BottomSideBar({ onOptionClick }) {
  const options = [
    { name: 'Character', icon: <Users size={24} />, id: 'character' },
    { name: 'Skills', icon: <Book size={24} />, id: 'skills' },
    { name: 'Inventory', icon: <Shield size={24} />, id: 'inventory' },
    { name: 'Rituals', icon: <FlaskConical size={24} />, id: 'rituals' },
    { name: 'Attacks', icon: <Sword size={24} />, id: 'attacks' },
  ];

  const handleClick = (optionId) => {
    if (onOptionClick) {
      onOptionClick(optionId); // Pass the selected option ID to the parent
    }
  };

  return (
    <>
      <div className="h-[50px] bottom-0"></div>
      <div className="h-[50px] fixed bottom-0 bg-dark-bg-secondary border-t border-primary w-full -ml-5 flex items-center sm:px-10 px-5">
        {/* Single flex container for all icons */}
        <div className="flex justify-between w-full">
          {/* Option icons */}
          {options.map((option) => (
            <button key={option.id} onClick={() => handleClick(option.id)} className="text-foreground/70 hover:text-foreground transition-colors">
              {option.icon}
            </button>
          ))}
          {/* Hamburger menu icon */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" className="p-0">
                <Menu size={24} className="text-foreground/70 hover:text-foreground" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-dark-bg-secondary border-t border-gray-700">
              <div className="flex flex-col p-4 space-y-4">
                {options.map((option) => (
                  <button key={option.id} onClick={() => handleClick(option.id)} className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
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
