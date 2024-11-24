import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useCharacter } from '../../character-page';
import { Separator } from '../../../../components/ui/separator';
import DeleteCharacter from '../utils/delete-character';
import { Progress } from '../../../../components/ui/progress';
import { ScrollArea } from '../../../../components/ui/scroll-area';
import { IoOpenOutline } from 'react-icons/io5';
import { Popover, PopoverContent, PopoverTrigger } from '../../../../components/ui/popover';

export default function MobileCharacterStatus() {
  const { character } = useCharacter();
  const [isOpen, setIsOpen] = useState(true);

  const [width, setWidth] = useState(300);
  const maxWidth = window.innerWidth - 100;
  const minWidth = 300;

  const handlers = useSwipeable({
    onSwipedRight: () => setIsOpen(true),
    onSwipedLeft: () => setIsOpen(false),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newWidth = clientX;

    if (isOpen) {
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    }
  };

  const handleDragEnd = () => {
    if (width > maxWidth - 100) {
      setWidth(maxWidth); // Ajusta para largura máxima
    } else if (width < minWidth + 100) {
      setWidth(minWidth); // Ajusta para largura mínima
    }
  };

  return (
    <div {...handlers} className={`fixed top-0 left-0 h-full z-50 flex ${isOpen ? 'w-screen' : 'w-5'}`}>
      {/* Open Drawer */}
      {!isOpen && (
        <div className="bg-primary/60 h-[94vh] bottom-0 fixed w-[0.1px] -z-20">
          <button
            className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-primary text-black rounded-r-md px-1 border-primary-foreground border rounded-tr-lg rounded-br-lg shadow-md md:text-3xl text-base z-50"
            onClick={() => setIsOpen(true)}
          >
            <span>{'>'}</span>
          </button>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 z-40"
          onClick={() => setIsOpen(false)} // Fecha ao clicar fora
        ></div>
      )}

      {/* Drawer */}
      <ScrollArea
        className={`top-0 left-0 max-h-screen bg-dark-bg-secondary border-r border-r-primary shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          width: `${width}px`,
          zIndex: 50,
        }}
        onMouseMove={(e) => isOpen && handleDrag(e)}
        onMouseUp={() => handleDragEnd()}
        onTouchMove={(e) => isOpen && handleDrag(e)}
        onTouchEnd={() => handleDragEnd()}
        onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar na drawer
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 text-white">
          <h2 className="text-lg font-light">Detalhes do Personagem</h2>
          <button
            className="text-white hover:text-gray-200"
            onClick={(e) => {
              e.stopPropagation(); // Impede o fechamento ao clicar no botão
              setIsOpen(false);
            }}
          >
            X
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col space-y-5">
          <div className="flex space-x-5 items-center">
            <div className="w-14 h-14 bg-gray-400 rounded-full"></div>
            <span className="text-3xl">{character.name}</span>
            <DeleteCharacter />
          </div>
          <Separator />
          <div className="text-sm">
            <AtributesInfo label="Criado por" value={character.owner.id === '1' ? 'Você' : character.owner.username} />
            <AtributesInfo label="Campanha" value={character.campaign.name} />
          </div>
          <Separator />
          <div className="text-sm">
            <AtributesInfo label="Origem" value={character.origin.name} />
            <AtributesInfo label="Classe" value={character.class.name} />
            <AtributesInfo label="Subclasse" value={character.subclass.name} />
          </div>
          <Separator />
          <div className="w-full flex flex-col space-y-2 text-lg">
            <StatusInfo current={character.current_health} max={character.max_health} label="Vida" bgColor="bg-green-600" secondaryColor="bg-green-900" />
            <StatusInfo current={character.current_effort} max={character.max_effort} label="PE" bgColor="bg-purple-700" secondaryColor="bg-purple-900" />
            <StatusInfo current={character.current_sanity} max={character.max_sanity} label="Sanidade" bgColor="bg-cyan-700" secondaryColor="bg-cyan-950" />
          </div>
          <div className="text-lg">
            <Separator />
            <h1 className="text-center font-light text-xl mt-2">Atributos</h1>
            <AtributesInfo label="Força" value={character.atributes.strength} />
            <AtributesInfo label="Agilidade" value={character.atributes.dexterity} />
            <AtributesInfo label="Intelecto" value={character.atributes.intelligence} />
            <AtributesInfo label="Presença" value={character.atributes.presence} />
            <AtributesInfo label="Vigor" value={character.atributes.vitality} />
          </div>
          <Separator />
          <div className="text-lg">
            <AtributesInfo label="NEX" value={character.level * 5} />
            <AtributesInfo label="Deslocamento" value={character.speed} />
            <AtributesInfo label="Defesa" value={character.defense} />
          </div>

          <Separator />
          <div>
            <h1 className="text-center font-light text-xl mt-2">Resistências</h1>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function StatusInfo({ current, max, label, bgColor, secondaryColor }: { current: number; max: number; label: string; bgColor: string; secondaryColor: string }) {
  const [currentValue] = useState(current);
  const [tempValue] = useState(100);
  const [open, setOpen] = useState(false);
  let hoverTimeout: NodeJS.Timeout;

  const adjustedMax = max + tempValue;
  const currentPercentage = (currentValue / adjustedMax) * 100;
  const tempPercentage = (tempValue / adjustedMax) * 100;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => setOpen(false), 200); // Atraso de 300ms para fechar
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setOpen(!open)} // Alternar no clique
          className="flex w-full items-center cursor-pointer"
        >
          <div className="w-32 flex items-center space-x-1">
            <IoOpenOutline className="text-lg text-white" />
            <span className="text-primary">{label}</span>
          </div>
          <div className="relative w-full max-w-[300px]">
            <Progress value={currentPercentage} secondaryValue={currentPercentage + tempPercentage} className="w-full" insideClassName={bgColor} secondaryClassName={secondaryColor} />
            <span className="absolute inset-0 flex items-center justify-center text-sm text-white font-bold z-20">
              {currentValue} / {adjustedMax}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent
          onMouseEnter={handleMouseEnter}
          side="top"
          onMouseLeave={handleMouseLeave} // Evitar fechamento ao passar o mouse no conteúdo
          className="flex items-center py-0 justify-between rounded-lg shadow-md h-12"
        >
          <div className="flex items-center">
            <h1 className="text-xs absolute top-0">{label}</h1>
            <span className="mt-2">
              {currentValue} / {max}
            </span>
          </div>
          <Separator className="bg-white h-[70%]" orientation="vertical" />
          <div className="flex items-center">
            <h1 className="text-xs absolute top-0">Temp</h1>
            <span className="mt-2">{tempValue}</span>
          </div>
          <Separator className="bg-white h-[70%]" orientation="vertical" />
          <div>
            <input type="number" className="bg-transparent text-primary w-10 border border-primary outline-none" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function AtributesInfo({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex items-center justify-between w-full  space-x-4">
      <span className="text-primary w-20">{label}</span>
      <span>{value}</span>
    </div>
  );
}
