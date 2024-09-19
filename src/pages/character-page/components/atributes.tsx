import { useCharacter } from '../character-page';

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
      <div className="w-[110%] h-[1px] bg-white"></div>

      {/* Linha esquerda */}
      <div
        className="w-[110%] h-[1px] bg-white"
        style={{
          transform: 'rotate(-60deg)',
          transformOrigin: 'left bottom',
        }}
      ></div>

      {/* Linha direita */}
      <div
        className="w-[110%] -mt-[1px] h-[1px] bg-white"
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
      className="flex flex-col mt-5 space-y-10 pb-10  max-h-fit"
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <AtributeTriangle value={character.atributes.strenght} label="Força" abbreviation="FOR" />
      <AtributeTriangle value={character.atributes.dexterity} label="Agilidade" abbreviation="AGI" />
      <AtributeTriangle value={character.atributes.vitality} label="Vitalidade" abbreviation="VIG" />
      <AtributeTriangle value={character.atributes.intelligence} label="Intelecto" abbreviation="INT" />
      <AtributeTriangle value={character.atributes.presence} label="Presença" abbreviation="PRE" />
    </div>
  );
}
