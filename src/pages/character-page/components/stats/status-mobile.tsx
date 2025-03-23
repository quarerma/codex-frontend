import { useCharacter } from '@/pages/character-page/character-page';
import { Separator } from '@/components/ui/separator';
import DeleteCharacter from '../utils/delete-character';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IoOpenOutline } from 'react-icons/io5';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';

export default function MobileCharacterStatus({ isOpen, setIsOpen }) {
  // Receive isOpen and setIsOpen as props
  const { character } = useCharacter();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-[300px] p-0 font-romannew bg-dark-bg-secondary border-r border-r-primary">
        <SheetHeader className="p-4">
          <SheetTitle className="text-2xl font-light text-foreground">Detalhes do Personagem</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-4 flex flex-col space-y-5">
            <div className="flex space-x-5 items-center">
              <div className="w-14 h-14 bg-gray-400 rounded-full"></div>
              <span className="text-5xl text-foreground">{character.name}</span>
              <DeleteCharacter />
            </div>
            <Separator />
            <div className="text-lg text-foreground">
              <AtributesInfo label="Criado por" value={character.owner.id === '1' ? 'Você' : character.owner.username} />
              <AtributesInfo label="Campanha" value={character.campaign.name} />
            </div>
            <Separator />
            <div className="text-lg text-foreground">
              <AtributesInfo label="Origem" value={character.origin.name} />
              <AtributesInfo label="Classe" value={character.class.name} />
              <AtributesInfo label="Subclasse" value={character.subclass.name} />
            </div>
            <Separator />
            <div className="w-full flex flex-col space-y-2 text-2xl text-foreground">
              <StatusInfo current={character.current_health} max={character.max_health} label="Vida" bgColor="bg-green-600" secondaryColor="bg-green-900" />
              <StatusInfo current={character.current_effort} max={character.max_effort} label="PE" bgColor="bg-purple-700" secondaryColor="bg-purple-900" />
              <StatusInfo current={character.current_sanity} max={character.max_sanity} label="Sanidade" bgColor="bg-cyan-700" secondaryColor="bg-cyan-950" />
            </div>
            <div className="text-2xl text-foreground">
              <Separator />
              <h1 className="text-center font-light text-3xl mt-2">Atributos</h1>
              <AtributesInfo label="Força" value={character.atributes.strength} />
              <AtributesInfo label="Agilidade" value={character.atributes.dexterity} />
              <AtributesInfo label="Intelecto" value={character.atributes.intelligence} />
              <AtributesInfo label="Presença" value={character.atributes.presence} />
              <AtributesInfo label="Vigor" value={character.atributes.vitality} /> {/* Fixed typo: VigOR -> Vigor */}
            </div>
            <Separator />
            <div className="text-2xl text-foreground">
              <AtributesInfo label="NEX" value={character.level * 5} />
              <AtributesInfo label="Deslocamento" value={character.speed} />
              <AtributesInfo label="Defesa" value={character.defense} />
            </div>
            <Separator />
            <div className="text-foreground">
              <h1 className="text-center font-light text-3xl mt-2">Resistências</h1>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// StatusInfo and AtributesInfo remain unchanged
function StatusInfo({ current, max, label, bgColor, secondaryColor }) {
  const [currentValue] = useState(current);
  const [tempValue] = useState(100);
  const [open, setOpen] = useState(false);
  let hoverTimeout;

  const adjustedMax = max + tempValue;
  const currentPercentage = (currentValue / adjustedMax) * 100;
  const tempPercentage = (tempValue / adjustedMax) * 100;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setOpen(!open)} className="flex w-full items-center cursor-pointer">
          <div className="w-32 flex items-center space-x-1">
            <IoOpenOutline className="text-2xl text-foreground" />
            <span className="text-primary">{label}</span>
          </div>
          <div className="relative w-full max-w-[300px]">
            <Progress value={currentPercentage} secondaryValue={currentPercentage + tempPercentage} className="w-full" insideClassName={bgColor} secondaryClassName={secondaryColor} />
            <span className="absolute inset-0 flex items-center justify-center text-lg text-foreground font-bold z-20">
              {currentValue} / {adjustedMax}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent onMouseEnter={handleMouseEnter} side="top" onMouseLeave={handleMouseLeave} className="flex items-center py-0 justify-between rounded-lg shadow-md h-12">
          <div className="flex items-center">
            <h1 className="text-base absolute top-0">{label}</h1>
            <span className="mt-2">
              {currentValue} / {max}
            </span>
          </div>
          <Separator className="bg-foreground h-[70%]" orientation="vertical" />
          <div className="flex items-center">
            <h1 className="text-base absolute top-0">Temp</h1>
            <span className="mt-2">{tempValue}</span>
          </div>
          <Separator className="bg-foreground h-[70%]" orientation="vertical" />
          <div>
            <input type="number" className="bg-transparent text-primary w-10 border border-primary outline-none" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function AtributesInfo({ label, value }) {
  return (
    <div className="flex items-center justify-between w-full space-x-4">
      <span className="text-primary w-20">{label}</span>
      <span>{value}</span>
    </div>
  );
}
