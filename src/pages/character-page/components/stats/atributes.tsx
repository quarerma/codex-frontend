import { useCharacter } from '../../character-page';

interface AtributeTriangleProps {
  value: number;
  label: string;
  abbreviation: string;
}

function AtributeTriangle({ value, abbreviation }: AtributeTriangleProps) {
  return (
    <div className="relative flex flex-col  font-inter items-center text-2xl font-light">
      <div className="relative z-10 pt-3 pb-1 px-5 flex flex-col items-center">
        <h1 className="text-primary">{value}</h1>
        <h1 className="tracking-[0.2rem]">{abbreviation}</h1>
      </div>

      {/* Linha inferior */}
      <div className="w-[100px] h-[1px] bg-white"></div>

      {/* Linha esquerda */}
      <div
        className="w-[100px] h-[1px] bg-white"
        style={{
          transform: 'rotate(-60deg)',
          transformOrigin: 'left bottom',
        }}
      ></div>

      {/* Linha direita */}
      <div
        className="w-[100px] -mt-[1px] h-[1px] bg-white"
        style={{
          transform: 'rotate(60deg)',
          transformOrigin: 'right top',
        }}
      ></div>
    </div>
  );
}

export default function CharacterAtributes() {
  const { character } = useCharacter();
  return (
    <div
      className="flex max-lg:flex-wrap lg:flex-col w-full mt-10 pb-10 max-h-fit  lg:space-y-2 lg:space-x-0 gap-x-4 gap-y-4 "
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <AtributeTriangle value={character.atributes.strength} label="Força" abbreviation="FOR" />
      <AtributeTriangle value={character.atributes.dexterity} label="Agilidade" abbreviation="AGI" />
      <AtributeTriangle value={character.atributes.vitality} label="Vitalidade" abbreviation="VIG" />
      <AtributeTriangle value={character.atributes.intelligence} label="Intelecto" abbreviation="INT" />
      <AtributeTriangle value={character.atributes.presence} label="Presença" abbreviation="PRE" />
    </div>
  );
}
